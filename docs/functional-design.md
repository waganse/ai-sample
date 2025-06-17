# トモリエ（Tomorie）機能設計書

## 1. 技術スタック

### 1.1 バックエンド
- **Database**: Supabase PostgreSQL
- **認証**: Supabase Auth
- **ストレージ**: Supabase Storage
- **リアルタイム**: Supabase Realtime

### 1.2 フロントエンド
- **モバイル**: React Native + Expo
- **Web**: Next.js (React)
- **状態管理**: React Query + Zustand
- **UI**: NativeBase / Chakra UI

## 2. データベース設計

### 2.1 ユーザー関連テーブル

#### users テーブル
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID REFERENCES auth.users(id) NOT NULL,
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
  verification_status VARCHAR(20) DEFAULT 'pending',
  subscription_plan VARCHAR(20) DEFAULT 'free',
  subscription_expires_at TIMESTAMP WITH TIME ZONE,
  last_active_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### user_photos テーブル
```sql
CREATE TABLE user_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### user_verification テーブル
```sql
CREATE TABLE user_verification (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  document_type VARCHAR(50) NOT NULL, -- 'license', 'mynumber', 'insurance'
  document_url TEXT NOT NULL,
  verification_status VARCHAR(20) DEFAULT 'pending',
  verified_at TIMESTAMP WITH TIME ZONE,
  verified_by UUID,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2.2 マッチング関連テーブル

#### likes テーブル
```sql
CREATE TABLE likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  to_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(from_user_id, to_user_id)
);
```

#### matches テーブル
```sql
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user1_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user2_id UUID REFERENCES users(id) ON DELETE CASCADE,
  matched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  last_message_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user1_id, user2_id)
);
```

#### messages テーブル
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type VARCHAR(20) DEFAULT 'text', -- 'text', 'image', 'system'
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2.3 コミュニティ関連テーブル

#### communities テーブル
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
```

#### community_members テーブル
```sql
CREATE TABLE community_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  community_id UUID REFERENCES communities(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(20) DEFAULT 'member', -- 'admin', 'moderator', 'member'
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  UNIQUE(community_id, user_id)
);
```

#### community_posts テーブル
```sql
CREATE TABLE community_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  community_id UUID REFERENCES communities(id) ON DELETE CASCADE,
  author_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200),
  content TEXT NOT NULL,
  post_type VARCHAR(20) DEFAULT 'discussion', -- 'discussion', 'event', 'announcement'
  image_urls TEXT[],
  like_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### post_comments テーブル
```sql
CREATE TABLE post_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE,
  author_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  parent_comment_id UUID REFERENCES post_comments(id) ON DELETE CASCADE,
  like_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2.4 イベント関連テーブル

#### events テーブル
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  event_type VARCHAR(50), -- 'online', 'offline', 'hybrid'
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
```

#### event_participants テーブル
```sql
CREATE TABLE event_participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'registered', -- 'registered', 'attended', 'cancelled'
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);
```

### 2.5 セキュリティ・監視関連テーブル

#### reports テーブル
```sql
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID REFERENCES users(id) ON DELETE SET NULL,
  reported_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reported_content_id UUID, -- posts, messages等のID
  reported_content_type VARCHAR(50), -- 'user', 'message', 'post', 'comment'
  reason VARCHAR(100) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'investigating', 'resolved', 'dismissed'
  resolved_by UUID,
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### blocked_users テーブル
```sql
CREATE TABLE blocked_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blocker_id UUID REFERENCES users(id) ON DELETE CASCADE,
  blocked_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reason VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(blocker_id, blocked_id)
);
```

#### moderation_logs テーブル
```sql
CREATE TABLE moderation_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  moderator_id UUID,
  action_type VARCHAR(50) NOT NULL, -- 'warning', 'suspend', 'ban', 'content_removal'
  target_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  target_content_id UUID,
  target_content_type VARCHAR(50),
  reason TEXT NOT NULL,
  action_duration INTERVAL, -- 停止期間等
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2.6 サブスクリプション関連テーブル

#### subscriptions テーブル
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plan_type VARCHAR(20) NOT NULL, -- 'monthly', '3month', '6month', 'yearly'
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'cancelled', 'expired'
  payment_provider VARCHAR(50), -- 'stripe', 'paypay'
  external_subscription_id VARCHAR(200),
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  auto_renew BOOLEAN DEFAULT TRUE,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### payment_history テーブル
```sql
CREATE TABLE payment_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  currency VARCHAR(3) DEFAULT 'JPY',
  payment_provider VARCHAR(50),
  payment_method VARCHAR(50),
  transaction_id VARCHAR(200),
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'refunded'
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 3. 主要機能の詳細設計

### 3.1 認証・プロフィール機能

#### 3.1.1 ユーザー登録フロー
1. **メール認証**: Supabase Auth による確認メール送信
2. **基本情報入力**: 名前、生年月日、性別、居住地
3. **本人確認書類アップロード**: Supabase Storage に保存
4. **プロフィール写真アップロード**: 最大5枚まで
5. **興味・関心事設定**: プリセット選択肢 + 自由入力
6. **出会いの目的設定**: 友人/恋人/趣味仲間/相談相手

#### 3.1.2 本人確認機能
- 運転免許証、マイナンバーカード、保険証の画像アップロード
- AI による文字認識で年齢自動チェック
- 人的確認による最終承認
- 確認済みユーザーにはバッジ表示

### 3.2 マッチング機能

#### 3.2.1 個人マッチングアルゴリズム
```javascript
// マッチング候補取得のロジック例
const getMatchCandidates = async (userId, filters) => {
  const user = await getUserProfile(userId);
  
  const candidates = await supabase
    .from('users')
    .select('*')
    .neq('id', userId)
    .eq('looking_for', 'romance') // 恋人探しに限定
    .eq('is_verified', true)
    .filter('age', 'gte', filters.minAge)
    .filter('age', 'lte', filters.maxAge)
    .filter('prefecture', 'eq', filters.prefecture)
    .not('id', 'in', getBlockedUserIds(userId))
    .not('id', 'in', getLikedUserIds(userId))
    .limit(50);
    
  return candidates;
};
```

#### 3.2.2 いいね・マッチング機能
- いいね送信時に相手も自分にいいねしていればマッチ成立
- マッチ成立時にリアルタイム通知
- マッチ後はメッセージ画面へ自動遷移

### 3.3 コミュニティ機能

#### 3.3.1 コミュニティ作成フロー
1. **基本情報入力**: 名前、説明、カテゴリ選択
2. **公開設定**: 公開/非公開、地域限定等
3. **カバー画像設定**: オプション
4. **初期メンバー招待**: オプション

#### 3.3.2 コミュニティ参加・投稿機能
- 公開コミュニティは自由参加
- 投稿タイプ: 議論、イベント告知、お知らせ
- 画像投稿対応（最大5枚）
- コメント・いいね機能

### 3.4 メッセージ機能

#### 3.4.1 リアルタイムメッセージング
```javascript
// Supabase Realtime を使用したメッセージ機能
const subscribeToMessages = (matchId, callback) => {
  return supabase
    .channel(`messages:${matchId}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: `match_id=eq.${matchId}`
    }, callback)
    .subscribe();
};
```

#### 3.4.2 メッセージ機能詳細
- テキストメッセージ
- 画像送信（Supabase Storage 使用）
- 既読機能
- メッセージ検索
- 不適切コンテンツの自動検知

### 3.5 イベント機能

#### 3.5.1 イベント作成・参加
- コミュニティ主催 or 個人主催
- オンライン/オフライン/ハイブリッド対応
- 参加費設定可能
- 参加者管理
- 定員管理

### 3.6 セキュリティ・監視機能

#### 3.6.1 自動監視システム
```javascript
// 不適切コンテンツ検知例
const moderateContent = async (content, type) => {
  // AI による自動判定
  const aiResult = await checkContentWithAI(content);
  
  if (aiResult.inappropriate) {
    // 自動で非表示化
    await hideContent(content.id, type);
    
    // 管理者に通知
    await notifyModerators(content, aiResult.reason);
  }
};
```

#### 3.6.2 通報・ブロック機能
- ユーザー、投稿、メッセージの通報
- 自動ブロック機能
- 管理者による審査・対応

## 4. API 設計

### 4.1 認証関連 API
```
POST /auth/register - ユーザー登録
POST /auth/login - ログイン
POST /auth/logout - ログアウト
POST /auth/verify-email - メール確認
```

### 4.2 プロフィール関連 API
```
GET /api/profile - プロフィール取得
PUT /api/profile - プロフィール更新
POST /api/profile/photos - 写真アップロード
DELETE /api/profile/photos/:id - 写真削除
POST /api/profile/verify - 本人確認書類アップロード
```

### 4.3 マッチング関連 API
```
GET /api/matches/candidates - マッチング候補取得
POST /api/matches/like - いいね送信
GET /api/matches - マッチ一覧取得
GET /api/matches/:id/messages - メッセージ履歴取得
POST /api/matches/:id/messages - メッセージ送信
```

### 4.4 コミュニティ関連 API
```
GET /api/communities - コミュニティ一覧
POST /api/communities - コミュニティ作成
GET /api/communities/:id - コミュニティ詳細
POST /api/communities/:id/join - コミュニティ参加
GET /api/communities/:id/posts - 投稿一覧
POST /api/communities/:id/posts - 投稿作成
```

### 4.5 決済関連 API（Stripe統合）
```
GET /api/subscriptions/plans - 料金プラン一覧取得
POST /api/subscriptions/create - サブスクリプション作成
GET /api/subscriptions - ユーザーのサブスクリプション取得
POST /api/subscriptions/cancel - サブスクリプション解約
POST /api/subscriptions/resume - サブスクリプション再開
GET /api/payments/history - 決済履歴取得
POST /api/webhooks/stripe - Stripe Webhook受信
```

#### 4.5.1 Stripe決済フロー
```javascript
// サブスクリプション作成フロー
const createSubscription = async (userId, planType) => {
  // 1. Stripeカスタマー作成/取得
  const customer = await stripe.customers.create({
    email: user.email,
    metadata: { userId }
  });

  // 2. Stripeプラン情報取得
  const plan = await supabase
    .from('stripe_plans')
    .select('*')
    .eq('plan_type', planType)
    .eq('is_active', true)
    .single();

  // 3. Checkout Session作成
  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    payment_method_types: ['card'],
    line_items: [{
      price: plan.stripe_price_id,
      quantity: 1,
    }],
    mode: 'subscription',
    success_url: `${baseUrl}/subscription/success`,
    cancel_url: `${baseUrl}/subscription/cancel`,
    metadata: { userId, planType }
  });

  return { sessionId: session.id, url: session.url };
};
```

#### 4.5.2 Webhook処理
```javascript
// Stripe Webhook処理
const handleStripeWebhook = async (event) => {
  // Webhook履歴に記録
  await supabase.from('stripe_webhooks').insert({
    stripe_event_id: event.id,
    event_type: event.type,
    data: event.data,
    processed: false
  });

  switch (event.type) {
    case 'customer.subscription.created':
      await handleSubscriptionCreated(event.data.object);
      break;
    
    case 'customer.subscription.updated':
      await handleSubscriptionUpdated(event.data.object);
      break;
    
    case 'invoice.payment_succeeded':
      await handlePaymentSucceeded(event.data.object);
      break;
    
    case 'invoice.payment_failed':
      await handlePaymentFailed(event.data.object);
      break;
  }
};
```

## 5. セキュリティ実装

### 5.1 Row Level Security (RLS)
```sql
-- users テーブルのRLS
CREATE POLICY "Users can view verified profiles" ON users
  FOR SELECT USING (is_verified = true AND auth.uid() IS NOT NULL);

-- messages テーブルのRLS  
CREATE POLICY "Users can only access their match messages" ON messages
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM matches 
      WHERE id = match_id 
      AND (user1_id = auth.uid() OR user2_id = auth.uid())
      AND is_active = true
    )
  );
```

### 5.2 データ暗号化
- PII（個人識別情報）の暗号化
- メッセージの暗号化
- 本人確認書類の暗号化保存

---

**最終更新日**: 2024年6月16日  
**バージョン**: 1.0  
**作成者**: トモリエ開発チーム