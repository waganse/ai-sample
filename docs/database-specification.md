# トモリエ（Tomorie）データベース設計仕様書

## 1. 概要

### 1.1 データベース構成
- **DBMS**: Supabase PostgreSQL 15+
- **認証**: Supabase Auth
- **ストレージ**: Supabase Storage
- **リアルタイム**: Supabase Realtime
- **セキュリティ**: Row Level Security (RLS)

### 1.2 設計方針
- **正規化**: 第3正規形まで適用
- **パフォーマンス**: 適切なインデックス設計
- **セキュリティ**: RLSによるデータ保護
- **拡張性**: 将来的なスケールアウトを考慮

## 2. テーブル設計詳細

### 2.1 認証・ユーザー管理

#### auth.users（Supabase標準）
```sql
-- Supabaseが自動生成・管理
-- 認証情報のみ格納
```

#### users（メインユーザー情報）
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID REFERENCES auth.users(id) NOT NULL UNIQUE,
  email VARCHAR(255) UNIQUE NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  birth_date DATE NOT NULL,
  gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')) NOT NULL,
  prefecture VARCHAR(50) NOT NULL,
  city VARCHAR(100),
  bio TEXT,
  occupation VARCHAR(100),
  education VARCHAR(100),
  interests TEXT[], -- 趣味・関心事の配列
  looking_for VARCHAR(50) CHECK (looking_for IN ('friendship', 'romance', 'hobby_partner', 'counselor')) NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  verification_status VARCHAR(20) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
  subscription_plan VARCHAR(20) DEFAULT 'free' CHECK (subscription_plan IN ('free', 'monthly', '3month', '6month', 'yearly')),
  subscription_expires_at TIMESTAMP WITH TIME ZONE,
  last_active_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス
CREATE UNIQUE INDEX idx_users_auth_id ON users(auth_id);
CREATE UNIQUE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_location ON users(prefecture, city);
CREATE INDEX idx_users_looking_for ON users(looking_for);
CREATE INDEX idx_users_verified ON users(is_verified);
CREATE INDEX idx_users_active ON users(last_active_at);

-- RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "verified_users_select" ON users
  FOR SELECT USING (is_verified = true AND auth.uid() IS NOT NULL);

CREATE POLICY "own_profile_update" ON users
  FOR UPDATE USING (auth.uid() = auth_id);

-- トリガー
CREATE TRIGGER verify_age_before_insert_update
  BEFORE INSERT OR UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION verify_age_requirement();

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

#### user_photos（プロフィール写真）
```sql
CREATE TABLE user_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  photo_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_user_photos_user_id ON user_photos(user_id);
CREATE INDEX idx_user_photos_primary ON user_photos(user_id, is_primary);

-- RLS
ALTER TABLE user_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "photos_select_verified_users" ON user_photos
  FOR SELECT USING (
    EXISTS(SELECT 1 FROM users WHERE id = user_id AND is_verified = true)
  );

CREATE POLICY "own_photos_crud" ON user_photos
  FOR ALL USING (
    EXISTS(SELECT 1 FROM users WHERE id = user_id AND auth_id = auth.uid())
  );
```

#### user_verification（本人確認）
```sql
CREATE TABLE user_verification (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  document_type VARCHAR(50) NOT NULL CHECK (document_type IN ('license', 'mynumber', 'insurance')),
  document_url TEXT NOT NULL,
  verification_status VARCHAR(20) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
  verified_at TIMESTAMP WITH TIME ZONE,
  verified_by UUID,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_user_verification_user_id ON user_verification(user_id);
CREATE INDEX idx_user_verification_status ON user_verification(verification_status);

-- RLS
ALTER TABLE user_verification ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own_verification_access" ON user_verification
  FOR ALL USING (
    EXISTS(SELECT 1 FROM users WHERE id = user_id AND auth_id = auth.uid())
  );
```

### 2.2 マッチング機能

#### likes（いいね）
```sql
CREATE TABLE likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  to_user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(from_user_id, to_user_id)
);

-- インデックス
CREATE INDEX idx_likes_from_user ON likes(from_user_id);
CREATE INDEX idx_likes_to_user ON likes(to_user_id);
CREATE UNIQUE INDEX idx_likes_unique ON likes(from_user_id, to_user_id);

-- RLS
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "likes_insert_own" ON likes
  FOR INSERT WITH CHECK (from_user_id = auth.uid());

CREATE POLICY "likes_select_involved" ON likes
  FOR SELECT USING (from_user_id = auth.uid() OR to_user_id = auth.uid());

-- トリガー
CREATE TRIGGER create_match_on_mutual_like
  AFTER INSERT ON likes
  FOR EACH ROW EXECUTE FUNCTION create_match_on_mutual_like();
```

#### matches（マッチ）
```sql
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user1_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  user2_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  matched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  last_message_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user1_id, user2_id),
  CHECK (user1_id < user2_id) -- 順序固定でユニーク制約を保証
);

-- インデックス
CREATE INDEX idx_matches_user1 ON matches(user1_id);
CREATE INDEX idx_matches_user2 ON matches(user2_id);
CREATE INDEX idx_matches_active ON matches(is_active);
CREATE INDEX idx_matches_last_message ON matches(last_message_at);

-- RLS
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "matches_access_participants" ON matches
  FOR ALL USING (user1_id = auth.uid() OR user2_id = auth.uid());
```

#### messages（メッセージ）
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  message_type VARCHAR(20) DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'system')),
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_messages_match_id ON messages(match_id);
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);
CREATE INDEX idx_messages_unread ON messages(match_id, is_read);

-- パーティショニング（月次）
CREATE TABLE messages_y2024m06 PARTITION OF messages
FOR VALUES FROM ('2024-06-01') TO ('2024-07-01');

-- RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "messages_access_match_participants" ON messages
  FOR ALL USING (
    EXISTS(
      SELECT 1 FROM matches 
      WHERE id = match_id 
      AND (user1_id = auth.uid() OR user2_id = auth.uid())
      AND is_active = true
    )
  );

-- トリガー
CREATE TRIGGER update_match_last_message
  AFTER INSERT ON messages
  FOR EACH ROW EXECUTE FUNCTION update_match_last_message();

CREATE TRIGGER auto_moderate_message_content
  AFTER INSERT ON messages
  FOR EACH ROW EXECUTE FUNCTION auto_moderate_content();
```

### 2.3 コミュニティ機能

#### communities（コミュニティ）
```sql
CREATE TABLE communities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  category VARCHAR(50), -- 'travel', 'cooking', 'gardening', 'crafts', 'music', etc.
  cover_image_url TEXT,
  creator_id UUID REFERENCES users(id) ON DELETE SET NULL,
  member_count INTEGER DEFAULT 0,
  max_members INTEGER DEFAULT 500,
  is_public BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT TRUE,
  region VARCHAR(50), -- 地域限定コミュニティの場合
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_communities_category ON communities(category);
CREATE INDEX idx_communities_region ON communities(region);
CREATE INDEX idx_communities_public ON communities(is_public);
CREATE INDEX idx_communities_member_count ON communities(member_count);
CREATE INDEX idx_communities_name_gin ON communities USING GIN (to_tsvector('japanese', name));

-- RLS
ALTER TABLE communities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "communities_select_public_or_member" ON communities
  FOR SELECT USING (
    is_public = true 
    OR EXISTS(
      SELECT 1 FROM community_members 
      WHERE community_id = communities.id 
      AND user_id = auth.uid() 
      AND is_active = true
    )
  );

-- トリガー
CREATE TRIGGER update_communities_updated_at
  BEFORE UPDATE ON communities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

#### community_members（コミュニティメンバー）
```sql
CREATE TABLE community_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  community_id UUID REFERENCES communities(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  role VARCHAR(20) DEFAULT 'member' CHECK (role IN ('admin', 'moderator', 'member')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  UNIQUE(community_id, user_id)
);

-- インデックス
CREATE INDEX idx_community_members_community ON community_members(community_id);
CREATE INDEX idx_community_members_user ON community_members(user_id);
CREATE INDEX idx_community_members_active ON community_members(is_active);

-- RLS
ALTER TABLE community_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "community_members_select_public_or_member" ON community_members
  FOR SELECT USING (
    EXISTS(
      SELECT 1 FROM communities 
      WHERE id = community_id 
      AND (is_public = true OR EXISTS(
        SELECT 1 FROM community_members cm2 
        WHERE cm2.community_id = communities.id 
        AND cm2.user_id = auth.uid() 
        AND cm2.is_active = true
      ))
    )
  );

-- トリガー
CREATE TRIGGER update_community_member_count_on_change
  AFTER INSERT OR UPDATE OR DELETE ON community_members
  FOR EACH ROW EXECUTE FUNCTION update_community_member_count();
```

### 2.4 イベント機能

#### events（イベント）
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  event_type VARCHAR(50) CHECK (event_type IN ('online', 'offline', 'hybrid')),
  location VARCHAR(200),
  prefecture VARCHAR(50),
  city VARCHAR(100),
  start_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  end_datetime TIMESTAMP WITH TIME ZONE,
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  fee INTEGER DEFAULT 0,
  organizer_id UUID REFERENCES users(id) ON DELETE SET NULL,
  community_id UUID REFERENCES communities(id) ON DELETE SET NULL,
  cover_image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  registration_deadline TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_events_start_datetime ON events(start_datetime);
CREATE INDEX idx_events_location ON events(prefecture, city);
CREATE INDEX idx_events_active ON events(is_active);
CREATE INDEX idx_events_organizer ON events(organizer_id);
CREATE INDEX idx_events_community ON events(community_id);

-- トリガー
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 2.5 セキュリティ・監視

#### reports（通報）
```sql
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID REFERENCES users(id) ON DELETE SET NULL,
  reported_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reported_content_id UUID, -- posts, messages等のID
  reported_content_type VARCHAR(50) CHECK (reported_content_type IN ('user', 'message', 'post', 'comment')),
  reason VARCHAR(100) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'investigating', 'resolved', 'dismissed')),
  resolved_by UUID,
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_reported_user ON reports(reported_user_id);
CREATE INDEX idx_reports_reporter ON reports(reporter_id);

-- RLS
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "reports_insert_own" ON reports
  FOR INSERT WITH CHECK (reporter_id = auth.uid());

CREATE POLICY "reports_select_own" ON reports
  FOR SELECT USING (reporter_id = auth.uid());
```

### 2.6 サブスクリプション・決済（Stripe統合）

#### subscriptions（サブスクリプション）
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  plan_type VARCHAR(20) NOT NULL CHECK (plan_type IN ('monthly', '3month', '6month', 'yearly')),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
  payment_provider VARCHAR(50) DEFAULT 'stripe' CHECK (payment_provider IN ('stripe')),
  stripe_customer_id VARCHAR(200),
  stripe_subscription_id VARCHAR(200),
  stripe_price_id VARCHAR(200),
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  auto_renew BOOLEAN DEFAULT TRUE,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_expires ON subscriptions(expires_at);
CREATE INDEX idx_subscriptions_stripe_customer ON subscriptions(stripe_customer_id);
CREATE INDEX idx_subscriptions_stripe_subscription ON subscriptions(stripe_subscription_id);

-- RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "subscriptions_own_access" ON subscriptions
  FOR ALL USING (user_id = auth.uid());
```

#### payment_history（決済履歴）
```sql
CREATE TABLE payment_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  amount INTEGER NOT NULL,
  currency VARCHAR(3) DEFAULT 'JPY',
  payment_provider VARCHAR(50) DEFAULT 'stripe' CHECK (payment_provider IN ('stripe')),
  payment_method VARCHAR(50),
  stripe_payment_intent_id VARCHAR(200),
  stripe_charge_id VARCHAR(200),
  stripe_invoice_id VARCHAR(200),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_payment_history_user ON payment_history(user_id);
CREATE INDEX idx_payment_history_subscription ON payment_history(subscription_id);
CREATE INDEX idx_payment_history_status ON payment_history(status);
CREATE INDEX idx_payment_history_stripe_payment_intent ON payment_history(stripe_payment_intent_id);

-- RLS
ALTER TABLE payment_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "payment_history_own_access" ON payment_history
  FOR ALL USING (user_id = auth.uid());
```

#### stripe_plans（Stripeプラン管理）
```sql
CREATE TABLE stripe_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  plan_type VARCHAR(20) UNIQUE NOT NULL CHECK (plan_type IN ('monthly', '3month', '6month', 'yearly')),
  stripe_price_id VARCHAR(200) UNIQUE NOT NULL,
  stripe_product_id VARCHAR(200) NOT NULL,
  amount INTEGER NOT NULL,
  currency VARCHAR(3) DEFAULT 'JPY',
  interval VARCHAR(20) NOT NULL,
  interval_count INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス
CREATE UNIQUE INDEX idx_stripe_plans_plan_type ON stripe_plans(plan_type);
CREATE UNIQUE INDEX idx_stripe_plans_price_id ON stripe_plans(stripe_price_id);
CREATE INDEX idx_stripe_plans_active ON stripe_plans(is_active);
```

#### stripe_webhooks（Stripe Webhook管理）
```sql
CREATE TABLE stripe_webhooks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stripe_event_id VARCHAR(200) UNIQUE NOT NULL,
  event_type VARCHAR(100) NOT NULL,
  processed BOOLEAN DEFAULT FALSE,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス
CREATE UNIQUE INDEX idx_stripe_webhooks_event_id ON stripe_webhooks(stripe_event_id);
CREATE INDEX idx_stripe_webhooks_processed ON stripe_webhooks(processed);
CREATE INDEX idx_stripe_webhooks_event_type ON stripe_webhooks(event_type);
```

## 3. 関数・トリガー実装

### 3.1 共通関数
```sql
-- updated_atカラム自動更新
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 年齢確認（60歳以上）
CREATE OR REPLACE FUNCTION verify_age_requirement()
RETURNS TRIGGER AS $$
BEGIN
    IF EXTRACT(YEARS FROM AGE(NEW.birth_date)) < 60 THEN
        RAISE EXCEPTION '60歳以上の方のみご利用いただけます';
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';
```

### 3.2 マッチング関数
```sql
-- 相互いいねでマッチ作成
CREATE OR REPLACE FUNCTION create_match_on_mutual_like()
RETURNS TRIGGER AS $$
BEGIN
    -- 相手からのいいねが存在するかチェック
    IF EXISTS(
        SELECT 1 FROM likes 
        WHERE from_user_id = NEW.to_user_id 
        AND to_user_id = NEW.from_user_id 
        AND is_active = true
    ) THEN
        -- マッチを作成（user1_id < user2_idの順序で）
        INSERT INTO matches (user1_id, user2_id, matched_at)
        VALUES (
            LEAST(NEW.from_user_id, NEW.to_user_id),
            GREATEST(NEW.from_user_id, NEW.to_user_id),
            NOW()
        )
        ON CONFLICT (user1_id, user2_id) DO NOTHING;
        
        -- 通知作成
        INSERT INTO notifications (user_id, title, content, type, related_id, related_type)
        VALUES 
        (NEW.from_user_id, 'マッチしました！', 'お相手とマッチしました。メッセージを送ってみましょう。', 'match', NEW.to_user_id, 'user'),
        (NEW.to_user_id, 'マッチしました！', 'お相手とマッチしました。メッセージを送ってみましょう。', 'match', NEW.from_user_id, 'user');
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- マッチの最終メッセージ時刻更新
CREATE OR REPLACE FUNCTION update_match_last_message()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE matches 
    SET last_message_at = NEW.created_at
    WHERE id = NEW.match_id;
    RETURN NEW;
END;
$$ language 'plpgsql';
```

### 3.3 コミュニティ関数
```sql
-- コミュニティメンバー数更新
CREATE OR REPLACE FUNCTION update_community_member_count()
RETURNS TRIGGER AS $$
DECLARE
    community_id_to_update UUID;
BEGIN
    -- INSERT/UPDATEの場合
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        community_id_to_update := NEW.community_id;
    -- DELETEの場合
    ELSIF TG_OP = 'DELETE' THEN
        community_id_to_update := OLD.community_id;
    END IF;
    
    -- メンバー数を更新
    UPDATE communities 
    SET member_count = (
        SELECT COUNT(*) 
        FROM community_members 
        WHERE community_id = community_id_to_update 
        AND is_active = true
    )
    WHERE id = community_id_to_update;
    
    IF TG_OP = 'DELETE' THEN
        RETURN OLD;
    ELSE
        RETURN NEW;
    END IF;
END;
$$ language 'plpgsql';
```

### 3.4 Stripe決済関数
```sql
-- Stripe Webhook処理関数
CREATE OR REPLACE FUNCTION process_stripe_webhook()
RETURNS TRIGGER AS $$
BEGIN
    -- customer.subscription.updated処理
    IF NEW.event_type = 'customer.subscription.updated' THEN
        UPDATE subscriptions 
        SET 
            status = CASE 
                WHEN (NEW.data->>'status') = 'active' THEN 'active'
                WHEN (NEW.data->>'status') = 'canceled' THEN 'cancelled'
                WHEN (NEW.data->>'status') = 'past_due' THEN 'expired'
                ELSE status
            END,
            expires_at = to_timestamp((NEW.data->>'current_period_end')::bigint),
            auto_renew = (NEW.data->>'cancel_at_period_end')::boolean = false
        WHERE stripe_subscription_id = NEW.data->>'id';
        
    -- invoice.payment_succeeded処理
    ELSIF NEW.event_type = 'invoice.payment_succeeded' THEN
        INSERT INTO payment_history (
            user_id,
            amount,
            currency,
            payment_provider,
            stripe_payment_intent_id,
            stripe_charge_id,
            stripe_invoice_id,
            status,
            paid_at
        )
        SELECT 
            u.id,
            (NEW.data->>'amount_paid')::integer,
            NEW.data->>'currency',
            'stripe',
            NEW.data->>'payment_intent',
            NEW.data->>'charge',
            NEW.data->>'id',
            'completed',
            to_timestamp((NEW.data->>'created')::bigint)
        FROM users u
        JOIN subscriptions s ON u.id = s.user_id
        WHERE s.stripe_subscription_id = NEW.data->>'subscription';
        
    END IF;
    
    -- 処理完了マーク
    NEW.processed = true;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- サブスクリプション期限切れ自動処理
CREATE OR REPLACE FUNCTION expire_subscriptions()
RETURNS VOID AS $$
BEGIN
    UPDATE subscriptions 
    SET status = 'expired'
    WHERE expires_at < NOW() 
    AND status = 'active'
    AND auto_renew = false;
    
    -- 期限切れ通知
    INSERT INTO notifications (user_id, title, content, type)
    SELECT 
        user_id,
        'サブスクリプション期限切れ',
        'プレミアムプランの有効期限が切れました。継続をご希望の場合は再度お申し込みください。',
        'system'
    FROM subscriptions 
    WHERE expires_at < NOW() 
    AND status = 'expired'
    AND updated_at > NOW() - INTERVAL '1 hour'; -- 1時間以内に更新されたもののみ
END;
$$ language 'plpgsql';
```

### 3.5 セキュリティ関数
```sql
-- 不適切コンテンツ自動検知
CREATE OR REPLACE FUNCTION auto_moderate_content()
RETURNS TRIGGER AS $$
DECLARE
    inappropriate_words TEXT[] := ARRAY[
        '詐欺', '金銭', '投資', '副業', '儲け', 
        '不適切語句1', '不適切語句2'
    ];
    word TEXT;
BEGIN
    FOREACH word IN ARRAY inappropriate_words
    LOOP
        IF NEW.content ILIKE '%' || word || '%' THEN
            -- 管理者通知用ログ作成
            INSERT INTO moderation_logs (
                target_content_id,
                target_content_type,
                action_type,
                reason,
                created_at
            ) VALUES (
                NEW.id,
                TG_TABLE_NAME,
                'auto_flag',
                '不適切な語句を検出: ' || word,
                NOW()
            );
            
            -- 管理者に通知
            INSERT INTO notifications (
                user_id,
                title,
                content,
                type,
                related_id,
                related_type
            )
            SELECT 
                u.id,
                '要確認コンテンツ',
                '不適切な可能性のあるコンテンツが投稿されました',
                'moderation',
                NEW.id,
                TG_TABLE_NAME
            FROM users u 
            WHERE u.role = 'admin'; -- 管理者フラグがある場合
            
            BREAK;
        END IF;
    END LOOP;
    RETURN NEW;
END;
$$ language 'plpgsql';
```

## 4. パフォーマンス最適化

### 4.1 マッチング候補取得の最適化
```sql
-- 最適化されたマッチング候補取得関数
CREATE OR REPLACE FUNCTION get_match_candidates(
    p_user_id UUID,
    p_min_age INTEGER DEFAULT 60,
    p_max_age INTEGER DEFAULT 80,
    p_prefecture VARCHAR DEFAULT NULL,
    p_limit INTEGER DEFAULT 50
)
RETURNS TABLE (
    user_id UUID,
    display_name VARCHAR,
    age INTEGER,
    prefecture VARCHAR,
    city VARCHAR,
    primary_photo_url TEXT,
    interests TEXT[]
) AS $$
BEGIN
    RETURN QUERY
    WITH user_preferences AS (
        SELECT 
            u.prefecture as user_prefecture,
            u.looking_for as user_looking_for
        FROM users u 
        WHERE u.id = p_user_id
    ),
    filtered_candidates AS (
        SELECT 
            u.id,
            u.display_name,
            EXTRACT(YEARS FROM AGE(u.birth_date))::INTEGER as age,
            u.prefecture,
            u.city,
            u.interests
        FROM users u
        CROSS JOIN user_preferences up
        WHERE u.is_verified = true
        AND u.id != p_user_id
        AND u.looking_for = 'romance' -- 恋人探しの場合
        AND EXTRACT(YEARS FROM AGE(u.birth_date)) BETWEEN p_min_age AND p_max_age
        AND (p_prefecture IS NULL OR u.prefecture = p_prefecture)
        AND u.last_active_at > NOW() - INTERVAL '30 days'
        AND NOT EXISTS (
            SELECT 1 FROM likes l 
            WHERE l.from_user_id = p_user_id AND l.to_user_id = u.id
        )
        AND NOT EXISTS (
            SELECT 1 FROM blocked_users b 
            WHERE (b.blocker_id = p_user_id AND b.blocked_id = u.id)
            OR (b.blocker_id = u.id AND b.blocked_id = p_user_id)
        )
    )
    SELECT 
        fc.id,
        fc.display_name,
        fc.age,
        fc.prefecture,
        fc.city,
        up.photo_url,
        fc.interests
    FROM filtered_candidates fc
    LEFT JOIN user_photos up ON fc.id = up.user_id AND up.is_primary = true
    ORDER BY fc.last_active_at DESC
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;
```

### 4.2 インデックス戦略
```sql
-- 複合インデックスによる検索最適化
CREATE INDEX idx_users_matching_optimized ON users (
    is_verified, looking_for, prefecture, last_active_at
) WHERE is_verified = true;

-- GINインデックスによる配列検索最適化
CREATE INDEX idx_users_interests_gin ON users USING GIN (interests);

-- 部分インデックスによるアクティブユーザー最適化
CREATE INDEX idx_users_active_recent ON users (last_active_at) 
WHERE last_active_at > NOW() - INTERVAL '30 days';
```

## 5. セキュリティ実装

### 5.1 RLS完全設定例
```sql
-- すべてのテーブルでRLSを有効化
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_members ENABLE ROW LEVEL SECURITY;
-- ... 他のテーブルも同様

-- 認証されていないユーザーはアクセス不可
CREATE POLICY "authenticated_users_only" ON users
  FOR ALL USING (auth.uid() IS NOT NULL);
```

### 5.2 暗号化実装
```sql
-- 個人情報の暗号化（必要に応じて）
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 機密データ暗号化用関数
CREATE OR REPLACE FUNCTION encrypt_pii(data TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN encode(encrypt(data::bytea, 'encryption_key', 'aes'), 'base64');
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION decrypt_pii(encrypted_data TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN decrypt(decode(encrypted_data, 'base64'), 'encryption_key', 'aes')::TEXT;
END;
$$ LANGUAGE plpgsql;
```

## 6. 監視・運用

### 6.1 性能監視
```sql
-- スロークエリ監視
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- テーブルサイズ監視
CREATE OR REPLACE VIEW table_sizes AS
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size,
    pg_total_relation_size(schemaname||'.'||tablename) as bytes
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### 6.2 バックアップ戦略
```sql
-- 重要データの定期バックアップ
-- Supabaseの自動バックアップに加えて
-- 特定テーブルのエクスポート

-- 匿名化されたテストデータの作成
CREATE OR REPLACE FUNCTION create_anonymized_data()
RETURNS VOID AS $$
BEGIN
    -- ユーザーデータの匿名化
    UPDATE users SET 
        email = 'test' || id::text || '@example.com',
        display_name = 'テストユーザー' || (random()*1000)::integer,
        bio = 'テスト用プロフィールです'
    WHERE created_at < NOW() - INTERVAL '1 year';
END;
$$ LANGUAGE plpgsql;
```

---

**最終更新日**: 2024年6月16日  
**バージョン**: 1.0  
**作成者**: トモリエ開発チーム