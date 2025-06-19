-- メール通知テーブル
CREATE TABLE IF NOT EXISTS email_notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('welcome', 'match', 'message', 'community_invite', 'event_reminder')),
  data JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  sent_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_email_notifications_user_id ON email_notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_email_notifications_status ON email_notifications(status);
CREATE INDEX IF NOT EXISTS idx_email_notifications_type ON email_notifications(type);
CREATE INDEX IF NOT EXISTS idx_email_notifications_created_at ON email_notifications(created_at);

-- RLS ポリシー
ALTER TABLE email_notifications ENABLE ROW LEVEL SECURITY;

-- ユーザーは自分の通知のみ閲覧可能
CREATE POLICY "Users can view own notifications" ON email_notifications
  FOR SELECT USING (auth.uid() = user_id);

-- サービスロールのみ挿入・更新可能
CREATE POLICY "Service role can manage all notifications" ON email_notifications
  FOR ALL USING (auth.role() = 'service_role');

-- メール送信ログテーブル
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  to_email TEXT NOT NULL,
  from_email TEXT,
  subject TEXT NOT NULL,
  template_type TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'bounced')),
  provider TEXT DEFAULT 'supabase',
  external_id TEXT,
  error_message TEXT,
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_email_logs_to_email ON email_logs(to_email);
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON email_logs(status);
CREATE INDEX IF NOT EXISTS idx_email_logs_created_at ON email_logs(created_at);

-- RLS ポリシー
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- サービスロールのみアクセス可能
CREATE POLICY "Service role can manage email logs" ON email_logs
  FOR ALL USING (auth.role() = 'service_role');

-- メール送信トリガー関数
CREATE OR REPLACE FUNCTION process_email_notification()
RETURNS TRIGGER AS $$
DECLARE
  user_email TEXT;
  user_name TEXT;
  email_subject TEXT;
  email_content TEXT;
BEGIN
  -- ユーザー情報を取得
  SELECT 
    email,
    COALESCE(raw_user_meta_data->>'name', raw_user_meta_data->>'full_name', email) as name
  INTO user_email, user_name
  FROM auth.users 
  WHERE id = NEW.user_id;

  -- メールタイプに応じて件名と内容を生成
  CASE NEW.type
    WHEN 'match' THEN
      email_subject := '🎉 新しいマッチが成立しました！';
      email_content := format('
        <h2>おめでとうございます！</h2>
        <p>%s様</p>
        <p>%sさんとマッチが成立しました。</p>
        <p><a href="%s">プロフィールを見る</a></p>
      ', user_name, NEW.data->>'matched_user_name', NEW.data->>'profile_url');
    
    WHEN 'message' THEN
      email_subject := format('%sさんからメッセージが届きました', NEW.data->>'sender_name');
      email_content := format('
        <h2>新しいメッセージ</h2>
        <p>%s様</p>
        <p>%sさんからメッセージが届きました。</p>
        <blockquote>%s</blockquote>
        <p><a href="%s">返信する</a></p>
      ', user_name, NEW.data->>'sender_name', NEW.data->>'message_preview', NEW.data->>'chat_url');
    
    WHEN 'welcome' THEN
      email_subject := 'トモリエへようこそ！';
      email_content := format('
        <h2>トモリエへようこそ！</h2>
        <p>%s様</p>
        <p>ご登録ありがとうございます。素敵な出会いをお楽しみください。</p>
        <p><a href="%s">プロフィールを完成させる</a></p>
      ', user_name, NEW.data->>'profile_setup_url');
    
    ELSE
      email_subject := 'トモリエからのお知らせ';
      email_content := '<p>新しい通知があります。</p>';
  END CASE;

  -- メールログに記録
  INSERT INTO email_logs (to_email, subject, template_type, status)
  VALUES (user_email, email_subject, NEW.type, 'pending');

  -- 実際のメール送信はEdge Functionで処理
  -- ここではSupabase Authの機能を使用してメール送信をトリガー
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- トリガー作成
CREATE TRIGGER email_notification_trigger
  AFTER INSERT ON email_notifications
  FOR EACH ROW
  EXECUTE FUNCTION process_email_notification();