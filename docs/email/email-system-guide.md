# トモリエ メールシステム実装ガイド

## 📧 概要

トモリエプロジェクトでは、Supabaseの認証機能とカスタムSMTP設定を使用して、洗練されたメールシステムを構築しています。外部サービス（Resend等）に依存せず、Supabase単体でメール送信を実現します。

## 🎯 実装方針

- **Supabase Auth**: 認証関連メール（サインアップ、パスワードリセット）
- **カスタムSMTP**: 独自ドメインでの高品質メール配信
- **データベーストリガー**: 自動通知メールの送信
- **Edge Functions**: 複雑なメールロジックの処理

## 🔧 Supabaseダッシュボード設定

### 1. OAuth プロバイダー設定

#### **LINE認証設定**
1. **LINE Developersでアプリ作成**
   - [LINE Developers Console](https://developers.line.biz/) でチャンネル作成
   - Channel ID と Channel Secret を取得

2. **Supabaseでの設定**
   ```
   Authentication → Providers → LINE
   ✓ Enable LINE provider
   Channel ID: your_line_channel_id
   Channel Secret: your_line_channel_secret
   Redirect URL: https://your-project.supabase.co/auth/v1/callback
   ```

3. **環境変数設定**
   ```bash
   NEXT_PUBLIC_LINE_CHANNEL_ID=your_line_channel_id_here
   LINE_CHANNEL_SECRET=your_line_channel_secret_here
   ```

#### **その他のOAuth設定**
- **Google**: Client ID, Client Secret
- **Facebook**: App ID, App Secret
- リダイレクトURL: `https://your-project.supabase.co/auth/v1/callback`

### 2. SMTP設定

#### アクセス方法
```
Supabaseダッシュボード → Authentication → Settings → SMTP Settings
```

#### 設定項目
```
✓ Enable custom SMTP: ON
SMTP Host: smtp.gmail.com (Gmail使用時)
SMTP Port: 587 (TLS) または 465 (SSL)
SMTP Username: your-email@gmail.com
SMTP Password: アプリパスワード（Gmail 2段階認証必須）
Sender Email: noreply@tomorie.jp
Sender Name: トモリエ
```

### 2. 推奨SMTPプロバイダー

#### 開発環境: Gmail SMTP
```
Host: smtp.gmail.com
Port: 587
Username: your-gmail@gmail.com
Password: Googleアプリパスワード
注意: 2段階認証の有効化必須
```

#### 本番環境: SendGrid（推奨）
```
Host: smtp.sendgrid.net
Port: 587
Username: apikey
Password: SendGrid APIキー
利点: 高い配信率、詳細な分析
```

#### 本番環境: Amazon SES
```
Host: email-smtp.us-east-1.amazonaws.com
Port: 587
Username: SES SMTPユーザー名
Password: SES SMTPパスワード
利点: AWS統合、コスト効率
```

### 3. レート制限設定

```
Authentication → Rate Limits で以下を設定:

Email sent per hour: 50 (本番用)
Email OTP sent per hour: 20
SMS sent per hour: 10
SMS OTP sent per hour: 5
```

### 4. URL設定

```
Authentication → URL Configuration:

Site URL: https://tomorie.jp
Redirect URLs:
- https://tomorie.jp/auth/callback
- https://tomorie.jp/auth/reset-password
- https://tomorie.jp/dashboard
- https://tomorie.jp/profile/setup
```

## 🎨 スタイリッシュなメールテンプレートデザイン

### デザインコンセプト
- **ブランド統一**: サイトのティールカラー（#14b8a6）を基調とした洗練されたデザイン
- **シニア配慮**: 大きめフォント（18px+）、高コントラスト、読みやすい行間
- **モダン感**: グラデーション、シャドウ、アニメーション効果
- **温かさ**: 日本らしい絵文字、丁寧な言葉遣い、心温まるメッセージ

### カラーパレット
```typescript
primary: '#14b8a6'      // メインティール
primaryDark: '#0d9488'  // ダークティール  
primaryLight: '#5eead4' // ライトティール
warm: '#f59e0b'         // ウォームアクセント
success: '#10b981'      // サクセスグリーン
```

### Typography
```typescript
fonts: {
  primary: '"Helvetica Neue", "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
  sizes: {
    base: '16px',    // 本文
    lg: '18px',      // 強調文
    xl: '20px',      // 見出し小
    '2xl': '24px',   // 見出し中
    '3xl': '30px',   // 見出し大
    '4xl': '36px'    // タイトル
  }
}
```

## 📝 メールテンプレート設定

### Authentication → Email Templates

#### 確認メール (Confirm signup)
```html
<div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #dc2626; font-size: 28px;">トモリエへようこそ！</h1>
  </div>
  
  <div style="background: #f8fafc; padding: 30px; border-radius: 8px; margin-bottom: 20px;">
    <p style="font-size: 18px; margin-bottom: 20px;">{{ .Name }}様</p>
    
    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
      この度は、トモリエにご登録いただき、誠にありがとうございます。
    </p>
    
    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
      トモリエは、60歳以上の方々のための特別なコミュニティです。<br>
      以下のリンクをクリックして、メールアドレスを確認してください。
    </p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="{{ .ConfirmationURL }}" 
         style="background: #dc2626; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600; display: inline-block;">
        メールアドレスを確認する
      </a>
    </div>
    
    <p style="font-size: 14px; color: #6b7280;">
      このリンクは24時間有効です。
    </p>
  </div>
  
  <div style="text-align: center; color: #9ca3af; font-size: 14px;">
    <p>素敵な出会いを応援しています<br>トモリエチーム</p>
  </div>
</div>
```

#### マジックリンク (Magic Link)
```html
<div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #dc2626; font-size: 28px;">トモリエへのログイン</h1>
  </div>
  
  <div style="background: #f8fafc; padding: 30px; border-radius: 8px; margin-bottom: 20px;">
    <p style="font-size: 18px; margin-bottom: 20px;">{{ .Name }}様</p>
    
    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
      以下のリンクをクリックして、トモリエにログインしてください。
    </p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="{{ .ConfirmationURL }}" 
         style="background: #dc2626; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600; display: inline-block;">
        ログインする
      </a>
    </div>
    
    <p style="font-size: 14px; color: #6b7280;">
      このリンクは1時間有効です。
    </p>
  </div>
  
  <div style="text-align: center; color: #9ca3af; font-size: 14px;">
    <p>トモリエチーム</p>
  </div>
</div>
```

#### パスワードリセット (Reset Password)
```html
<div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #dc2626; font-size: 28px;">パスワードリセット</h1>
  </div>
  
  <div style="background: #f8fafc; padding: 30px; border-radius: 8px; margin-bottom: 20px;">
    <p style="font-size: 18px; margin-bottom: 20px;">{{ .Name }}様</p>
    
    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
      パスワードリセットのリクエストを受け付けました。
    </p>
    
    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
      以下のリンクをクリックして、新しいパスワードを設定してください。
    </p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="{{ .ConfirmationURL }}" 
         style="background: #dc2626; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600; display: inline-block;">
        新しいパスワードを設定する
      </a>
    </div>
    
    <p style="font-size: 14px; color: #6b7280;">
      このリンクは1時間有効です。
    </p>
  </div>
  
  <div style="text-align: center; color: #9ca3af; font-size: 14px;">
    <p>トモリエチーム</p>
  </div>
</div>
```

### 利用可能な変数
- `{{ .Email }}` - ユーザーのメールアドレス
- `{{ .Name }}` - ユーザー名（メタデータから）
- `{{ .ConfirmationURL }}` - 確認URL
- `{{ .SiteURL }}` - サイトURL
- `{{ .RedirectTo }}` - リダイレクト先URL

## 🏗️ 実装アーキテクチャ

### ファイル構成
```
src/lib/email/
├── types.ts                    # 型定義
├── supabase-simple.ts         # 基本メール送信
├── supabase-email.ts          # 高度なメール送信
└── templates/                 # メールテンプレート
    ├── WelcomeEmail.tsx
    ├── MatchNotificationEmail.tsx
    └── MessageNotificationEmail.tsx

src/app/api/email/
├── supabase/route.ts          # SupabaseメールAPI
└── test/route.ts              # テスト用エンドポイント

supabase/
├── functions/send-email/      # Edge Function
│   └── index.ts
└── migrations/
    └── create_email_notifications.sql
```

### データベーススキーマ

#### email_notifications テーブル
```sql
CREATE TABLE email_notifications (
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
```

#### email_logs テーブル
```sql
CREATE TABLE email_logs (
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
```

## 💻 使用方法

### 1. 認証方法

#### **メール認証**
```typescript
import { sendMagicLinkEmail, sendSignupEmail, sendPasswordResetEmail } from '@/lib/email/supabase-simple';

// 既存ユーザーへのマジックリンク送信（ログイン用）
await sendMagicLinkEmail('user@example.com', '/dashboard');

// 新規ユーザーへのサインアップメール送信
await sendSignupEmail('newuser@example.com');

// パスワードリセット送信
await sendPasswordResetEmail('user@example.com');
```

#### **ソーシャル認証**
```typescript
import { useAuth } from '@/hooks/useAuth';

const { signInWithProvider } = useAuth();

// Google認証
await signInWithProvider('google');

// LINE認証
await signInWithProvider('line');

// Facebook認証
await signInWithProvider('facebook');
```

### セキュリティ機能

#### 🔒 未登録ユーザーへの送信防止（強化版）
- **事前チェック**: APIエンドポイントでユーザー存在確認
- **ログイン**: 既存ユーザーのみにOTP送信
- **サインアップ**: 未登録ユーザーのみに新規作成許可
- **重複防止**: 既存ユーザーの重複登録を防止
- **メール確認**: 未確認ユーザーへの適切な案内

```typescript
// 強化されたユーザー存在確認システム

// 1. ログイン時の実装
const signInWithEmail = async (email: string) => {
  try {
    // 事前にユーザー存在確認
    const response = await fetch('/api/auth/check-user', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    
    const result = await response.json();
    
    if (!result.exists) {
      throw new Error('このメールアドレスは登録されていません。先にアカウントを作成してください。');
    }
    
    if (!result.confirmed) {
      throw new Error('メールアドレスがまだ確認されていません。登録時のメールをご確認ください。');
    }
    
    // 既存ユーザーにのみOTP送信
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false },
    });
    
    return { error };
  } catch (error) {
    return { error };
  }
};

// 2. サインアップ時の実装
const signUpWithEmail = async (email: string) => {
  try {
    // 事前にユーザー重複確認
    const response = await fetch('/api/auth/check-user', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    
    const result = await response.json();
    
    if (result.exists) {
      if (result.confirmed) {
        throw new Error('このメールアドレスは既に登録済みです。ログインページからサインインしてください。');
      } else {
        throw new Error('このメールアドレスは既に登録されていますが、メール確認が完了していません。');
      }
    }
    
    // 新規ユーザーのOTP送信
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        data: {
          user_type: 'senior',
          registration_source: 'tomorie_app',
        }
      },
    });
    
    return { error };
  } catch (error) {
    return { error };
  }
};

// 3. ユーザー存在確認API (/api/auth/check-user)
export async function POST(request: NextRequest) {
  const { email } = await request.json();
  
  // Prismaのusersテーブルでユーザー確認
  const { data: user, error } = await supabaseAdmin
    .from('users')
    .select('id, email, auth_id, created_at')
    .eq('email', email)
    .maybeSingle();
  
  if (error && error.code !== 'PGRST116') {
    return NextResponse.json(
      { error: 'ユーザー確認に失敗しました' },
      { status: 500 }
    );
  }
  
  return NextResponse.json({
    exists: !!user,
    confirmed: !!user, // usersテーブルに存在 = 確認済み
    message: user ? 'ユーザーが存在し、確認済みです' : 'ユーザーが見つかりませんでした'
  });
}
```

### 実装された保護機能

#### ✅ **ログイン画面**
- 未登録メールアドレス → エラー表示、新規登録案内
- 未確認メールアドレス → エラー表示、メール確認案内
- 確認済みユーザー → OTP送信実行
- **ソーシャル認証**: Google, LINE, Facebook対応

#### ✅ **サインアップ画面**
- 登録済みメールアドレス → エラー表示、ログイン案内
- 未確認の既存ユーザー → エラー表示、メール確認案内
- 新規メールアドレス → OTP送信実行
- **ソーシャル認証**: Google, LINE, Facebook対応

#### ✅ **LINE認証の特徴**
- **日本での普及率**: 90%以上のユーザーがLINEを利用
- **シニア層対応**: 60歳以上でも使い慣れたプラットフォーム
- **簡単ログイン**: パスワード不要の認証
- **信頼性**: LINEアカウントベースの安全な認証

#### ✅ **APIエンドポイント**
- `/api/auth/check-user` でユーザー存在・確認状態をチェック
- Supabase Admin APIを使用した効率的な確認
- 適切なエラーハンドリングとレスポンス

### 2. カスタム通知メール

```typescript
import { createEmailNotification } from '@/lib/email/supabase-simple';

// マッチ通知
await createEmailNotification(userId, 'match', {
  matched_user_name: '田中花子',
  matched_user_age: 65,
  profile_url: 'https://tomorie.jp/profile/12345'
});

// メッセージ通知
await createEmailNotification(userId, 'message', {
  sender_name: '佐藤太郎',
  message_preview: 'はじめまして！よろしくお願いします。',
  chat_url: 'https://tomorie.jp/chat/67890'
});
```

### 3. API経由でのメール送信

```typescript
// フロントエンドから
const response = await fetch('/api/email/supabase', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    type: 'match',
    userId: 'user-uuid',
    data: {
      to: 'user@example.com',
      matched_user_name: '田中花子',
      profile_url: 'https://tomorie.jp/profile/12345'
    }
  })
});
```

## 🔄 Edge Functions実装

### デプロイ方法
```bash
# Supabase CLIでデプロイ
supabase functions deploy send-email

# 環境変数設定
supabase secrets set SMTP_HOST=smtp.gmail.com
supabase secrets set SMTP_USER=your-email@gmail.com
supabase secrets set SMTP_PASS=your-app-password
```

### Edge Function の利点
- サーバーレス実行
- 高いスケーラビリティ
- TypeScript/Deno対応
- Supabaseとのネイティブ統合

## 🛡️ セキュリティ設定

### RLS (Row Level Security) ポリシー
```sql
-- ユーザーは自分の通知のみ閲覧可能
CREATE POLICY "Users can view own notifications" ON email_notifications
  FOR SELECT USING (auth.uid() = user_id);

-- サービスロールのみ管理可能
CREATE POLICY "Service role can manage all notifications" ON email_notifications
  FOR ALL USING (auth.role() = 'service_role');
```

### 環境変数
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# SMTPプロバイダー設定（Supabaseダッシュボードで設定）
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## 📊 監視とトラブルシューティング

### ログ確認方法
```sql
-- メール送信ログの確認
SELECT * FROM email_logs 
WHERE created_at >= NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;

-- 失敗したメールの確認
SELECT * FROM email_logs 
WHERE status = 'failed'
ORDER BY created_at DESC;
```

### よくある問題と解決方法

#### 1. メールが届かない
- **原因**: SPF/DKIM設定不足
- **解決**: 送信ドメインの認証設定

#### 2. Gmail SMTP エラー
- **原因**: 2段階認証未設定
- **解決**: Googleアカウントで2段階認証とアプリパスワード生成

#### 3. レート制限エラー
- **原因**: 送信頻度が制限を超過
- **解決**: ダッシュボードでレート制限を調整

#### 4. テンプレート表示エラー
- **原因**: HTML構文エラー
- **解決**: テンプレートの構文確認とテスト送信

## 🚀 本番運用での推奨事項

### 1. 専用SMTPサービスの使用
- SendGrid, Mailgun, Amazon SES等の専用サービス
- 高い配信率と詳細な分析機能

### 2. ドメイン認証の設定
- SPF, DKIM, DMARC レコードの設定
- 送信者レピュテーションの向上

### 3. 監視とアラートの設定
- メール送信失敗の監視
- 配信率の定期チェック
- エラーログの自動アラート

### 4. パフォーマンス最適化
- バッチ処理での一括送信
- キューシステムの導入
- 送信タイミングの最適化

## 📈 今後の拡張予定

- [ ] A/Bテスト機能
- [ ] メール開封率追跡
- [ ] 購読者管理機能
- [ ] テンプレートエディター
- [ ] 自動配信スケジュール
- [ ] マルチ言語対応

---

**最終更新**: 2024年12月
**担当者**: トモリエ開発チーム
**次回レビュー**: 2025年1月