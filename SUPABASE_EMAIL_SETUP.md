# Supabase Magic Link メールテンプレート設定ガイド

Magic linkログインに切り替えるために、Supabaseダッシュボードでメールテンプレートを設定します。

## 1. Supabaseダッシュボードでの設定

### 基本設定
1. **Supabaseダッシュボードにアクセス**
   - https://app.supabase.com/project/tbebcmsfiefzvviwdoyj にアクセス
   - 左サイドバーの「Authentication」→「Email Templates」をクリック

### Magic Link（ログイン用）の設定
2. **Magic Link テンプレートを選択**
   - 「Magic Link」テンプレートを選択
   - 以下の設定を行う：

   **件名（Subject）:**
   ```
   🌸 トモリエへのログイン - ワンクリックでアクセス
   ```

   **本文（Body）:**
   ```html
   <!-- email-templates/magic-link.html の内容をコピー -->
   ```

### Confirm signup（新規登録確認用）の設定
3. **Confirm signup テンプレートを選択**
   - 「Confirm signup」テンプレートを選択
   - 以下の設定を行う：

   **件名（Subject）:**
   ```
   🎉 トモリエへようこそ - アカウント確認をお願いします
   ```

   **本文（Body）:**
   ```html
   <!-- email-templates/signup-confirmation.html の内容をコピー -->
   ```

## 2. SMTPの設定（オプション）

### カスタムSMTPプロバイダーの使用
独自のメール送信サービスを使用する場合：

1. **Authentication** → **Settings** → **SMTP Settings**
2. 以下の設定例（SendGridの場合）：
   ```
   SMTP Host: smtp.sendgrid.net
   SMTP Port: 587
   SMTP User: apikey
   SMTP Pass: [SendGrid API Key]
   SMTP Admin Email: noreply@tomorie.com
   SMTP Sender Name: トモリエ
   ```

## 3. テンプレート変数

利用可能な変数：
- `{{ .Email }}` - ユーザーのメールアドレス
- `{{ .ConfirmationURL }}` - 確認/ログインURL
- `{{ .Token }}` - 確認トークン（Magic linkでは不要）
- `{{ .SiteURL }}` - サイトのベースURL

## 4. テスト方法

1. **開発環境でのテスト**
   ```bash
   npm run dev
   ```

2. **ログインフローのテスト**
   - `/auth/login` にアクセス
   - メールアドレスを入力
   - 「ログインリンクを送信」をクリック
   - メールを確認

3. **新規登録フローのテスト**
   - `/auth/register` にアクセス
   - メールアドレスを入力
   - 利用規約に同意
   - 「確認リンクを送信」をクリック
   - メールを確認

## 5. セキュリティ設定

### リダイレクトURL設定
1. **Authentication** → **URL Configuration**
2. **Site URL**: `http://localhost:3000`（開発用）
3. **Redirect URLs**:
   ```
   http://localhost:3000/auth/callback
   https://yourdomain.com/auth/callback
   ```

### セッション設定
1. **Authentication** → **Settings**
2. 推奨設定：
   - **JWT expiry**: 3600（1時間）
   - **Refresh token expiry**: 604800（7日）
   - **Double confirm email changes**: Enable
   - **Enable email confirmations**: Enable

## 6. 追加の設定

### メール制限設定
- **Rate limiting**: 1通/分（スパム防止）
- **Email change confirmations**: 有効
- **Secure email change**: 有効

### カスタムドメイン（本番環境）
本番環境では、独自ドメインからのメール送信を設定することを推奨：
- `noreply@tomorie.com`
- `support@tomorie.com`

これらの設定により、ユーザーフレンドリーなMagic linkログインシステムが完成します。