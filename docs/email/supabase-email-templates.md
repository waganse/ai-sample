# Supabaseメールテンプレート設定ガイド

## 1. ダッシュボードでのテンプレート設定

### Authentication > Email Templates で以下を設定：

#### **確認メール (Confirm signup)**
```html
<h2>トモリエへようこそ！</h2>
<p>{{ .Name }}様</p>
<p>ご登録ありがとうございます。以下のリンクをクリックしてメールアドレスを確認してください。</p>
<p><a href="{{ .ConfirmationURL }}">メールアドレスを確認する</a></p>
<p>このリンクは24時間有効です。</p>
<p>トモリエチーム</p>
```

#### **マジックリンク (Magic Link)**
```html
<h2>トモリエへのログイン</h2>
<p>{{ .Name }}様</p>
<p>以下のリンクをクリックしてログインしてください。</p>
<p><a href="{{ .ConfirmationURL }}">ログインする</a></p>
<p>このリンクは1時間有効です。</p>
<p>トモリエチーム</p>
```

#### **パスワードリセット (Reset Password)**
```html
<h2>パスワードリセット</h2>
<p>{{ .Name }}様</p>
<p>パスワードリセットのリクエストを受け付けました。</p>
<p><a href="{{ .ConfirmationURL }}">新しいパスワードを設定する</a></p>
<p>このリンクは1時間有効です。</p>
<p>トモリエチーム</p>
```

## 2. 利用可能な変数

- `{{ .Email }}` - ユーザーのメールアドレス
- `{{ .Name }}` - ユーザー名（メタデータから）
- `{{ .ConfirmationURL }}` - 確認URL
- `{{ .SiteURL }}` - サイトURL
- `{{ .RedirectTo }}` - リダイレクト先URL

## 3. レート制限設定

### Authentication > Rate Limits で設定：
- **Email sent per hour**: 50 (本番用)
- **Email OTP sent per hour**: 20
- **SMS sent per hour**: 10
- **SMS OTP sent per hour**: 5

## 4. リダイレクト設定

### Authentication > URL Configuration で設定：
- **Site URL**: https://your-domain.com
- **Redirect URLs**: 
  - https://your-domain.com/auth/callback
  - https://your-domain.com/auth/reset-password
  - https://your-domain.com/dashboard

## 5. 高度な設定

### カスタムメール送信関数
```sql
-- データベース関数でメール送信トリガー
CREATE OR REPLACE FUNCTION send_notification_email()
RETURNS TRIGGER AS $$
BEGIN
  -- カスタムロジック
  RETURN NEW;
END;
$$ language plpgsql;

-- トリガー設定
CREATE TRIGGER match_notification_trigger
  AFTER INSERT ON matches
  FOR EACH ROW
  EXECUTE FUNCTION send_notification_email();
```

## 6. 開発環境での設定

### ローカル開発用の設定：
```bash
# .env.local
SUPABASE_CUSTOM_SMTP_HOST=smtp.gmail.com
SUPABASE_CUSTOM_SMTP_PORT=587
SUPABASE_CUSTOM_SMTP_USER=your-email@gmail.com
SUPABASE_CUSTOM_SMTP_PASS=your-app-password
```

## 7. トラブルシューティング

### よくある問題と解決方法：

1. **メールが届かない**
   - SPF/DKIM レコードの設定
   - 送信者ドメインの認証
   - レート制限の確認

2. **Gmail SMTP使用時の注意**
   - 2段階認証の有効化
   - アプリパスワードの生成
   - 安全性の低いアプリの許可

3. **本番環境での推奨事項**
   - 専用SMTPサービスの使用
   - 送信ドメインの認証
   - 監視とアラートの設定