# Google認証設定ガイド

## 🌐 Google認証を選ぶ理由

### **シニア向けプラットフォームに最適**
- **普及率**: 世界最大のメールサービス（Gmail）
- **信頼性**: Googleアカウントベースの高セキュリティ認証
- **使いやすさ**: 既存のGoogleアカウントでワンクリック認証
- **パスワード不要**: 複雑なパスワード管理が不要

## 🔧 Google Cloud Console設定

### 1. **Google Cloud Projectの作成**

1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. Googleアカウントでログイン
3. **新しいプロジェクト**を作成
4. プロジェクト名: 「tomorie-auth」

### 2. **OAuth同意画面の設定**

1. **APIs & Services** → **OAuth consent screen**を選択
2. **External** を選択（一般ユーザー向け）
3. 以下の情報を入力：

```
App name: トモリエ
User support email: admin@tomorie.jp
App domain: tomorie.jp
Developer contact information: admin@tomorie.jp
```

#### **スコープ設定**
```
Scopes:
✓ ../auth/userinfo.email
✓ ../auth/userinfo.profile
✓ openid
```

#### **承認済みドメイン**
```
Authorized domains:
- tomorie.jp
- your-project.supabase.co
```

### 3. **OAuth 2.0認証情報の作成**

1. **APIs & Services** → **Credentials**を選択
2. **+ CREATE CREDENTIALS** → **OAuth 2.0 Client IDs**
3. アプリケーションの種類: **ウェブアプリケーション**
4. 以下の情報を入力：

```
Name: トモリエ Web Client
Authorized JavaScript origins:
- http://localhost:3000 (開発用)
- https://tomorie.jp (本番用)

Authorized redirect URIs:
- https://your-project.supabase.co/auth/v1/callback
```

### 4. **認証情報取得**

#### **Client ID & Client Secret**
```
Client ID: 123456789012-abc...googleusercontent.com
Client Secret: GOCSPX-abc123def456ghi789jkl012mno
```

⚠️ **Client Secretは絶対に公開しないでください**

## ⚙️ Supabase設定

### 1. **Supabaseダッシュボード設定**

1. Supabase Dashboard → **Authentication** → **Providers**
2. **Google** プロバイダーを探す
3. **Enable Google provider** をオンにする

### 2. **認証情報設定**
```
Client ID: [Google Cloud Consoleで取得したClient ID]
Client Secret: [Google Cloud Consoleで取得したClient Secret]
Redirect URL: https://your-project.supabase.co/auth/v1/callback
```

### 3. **環境変数設定**

#### **.env.local**
```bash
# Google認証設定
NEXT_PUBLIC_GOOGLE_CLIENT_ID=123456789012-abc...googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abc123def456ghi789jkl012mno
```

#### **.env.example** (既に追加済み)
```bash
# OAuth Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

## 💻 実装詳細

### 1. **useAuthフック更新**

```typescript
// src/hooks/useAuth.ts
const signInWithProvider = async (provider: 'google' | 'facebook' | 'line') => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  return { error };
};
```

### 2. **Googleアイコン追加**

```typescript
// src/components/ui/Icons.tsx (既に実装済み)
google: (props: LucideProps) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
),
```

### 3. **ログイン画面のGoogleボタン**

```typescript
// src/app/auth/login/page.tsx (既に実装済み)
<Button
  variant="outline"
  onClick={() => handleSocialLogin('google')}
  disabled={isLoading}
  className="w-full"
>
  <Icons.google className="w-5 h-5 mr-3" />
  Googleでログイン
</Button>
```

## 🎨 UI/UXデザイン

### **Googleボタンのスタイリング**
- **カラー**: Googleブランドカラー（マルチカラー）
- **背景**: `bg-white` (白背景)
- **ボーダー**: `border-gray-200` (グレーボーダー)
- **テキスト**: `text-gray-700` (ダークグレー)
- **ホバー**: `hover:bg-gray-50` (ホバー時の色変化)

### **ボタンの配置順序**
1. **Google** (最も普及)
2. **LINE** (日本で人気)
3. **Facebook** (グローバル)

## 🔐 セキュリティ考慮事項

### **1. スコープの最小化**
```javascript
// 必要最小限のスコープのみ要求
スコープ: userinfo.email, userinfo.profile, openid
```

### **2. HTTPS必須**
- 本番環境では必ずHTTPS を使用
- リダイレクトURLもHTTPSで設定

### **3. 認証情報の保護**
- Client Secretは環境変数で管理
- .env.local はgitignoreに追加
- 本番環境では環境変数で設定

### **4. CSRF対策**
- Supabaseが自動的にCSRF保護を提供
- stateパラメータによる検証

### **5. ドメイン制限**
- 承認済みドメインの適切な設定
- 不正なドメインからのアクセス防止

## 📱 ユーザーエクスペリエンス

### **シニア向けの配慮**
- **大きなボタン**: 44px以上の最小タップ領域
- **明確なラベル**: 「Googleでログイン」の分かりやすい表記
- **色分け**: Googleブランドカラーで識別しやすく
- **アイコン**: Googleのロゴで視覚的に理解しやすく

### **エラーハンドリング**
```typescript
try {
  await signInWithProvider('google');
} catch (error) {
  setError('Google認証に失敗しました。もう一度お試しください。');
}
```

## 🧪 テスト方法

### **1. 開発環境でのテスト**
1. Google認証ボタンをクリック
2. Googleログイン画面に遷移
3. Googleアカウントで認証
4. 認証完了後、アプリに戻る
5. ユーザー情報が正しく取得される

### **2. 本番前の確認項目**
- [ ] Client ID/Secret が正しく設定されている
- [ ] Callback URLが本番URLに更新されている
- [ ] HTTPS通信が機能している
- [ ] エラーハンドリングが適切に動作する
- [ ] OAuth同意画面が適切に表示される

## 🚀 本番デプロイ時の注意

### **1. 環境変数の更新**
```bash
# 本番環境の環境変数
NEXT_PUBLIC_GOOGLE_CLIENT_ID=[本番用Client ID]
GOOGLE_CLIENT_SECRET=[本番用Client Secret]
```

### **2. Google Cloud Consoleでの本番設定**
- Authorized redirect URIsを本番URLに変更
- 承認済みドメインに本番ドメインを追加
- OAuth同意画面を「本番環境」に変更

### **3. 監視とログ**
- Google認証の成功/失敗率を監視
- エラーログの確認
- ユーザーフィードバックの収集

### **4. Google APIクォータ**
- API使用量の監視
- 必要に応じてクォータの増加申請

## 📋 よくある問題と解決方法

### **1. redirect_uri_mismatch エラー**
- **原因**: リダイレクトURIが一致しない
- **解決**: Google Cloud ConsoleとSupabaseの設定を確認

### **2. access_denied エラー**
- **原因**: ユーザーが認証を拒否した
- **解決**: 適切なエラーメッセージを表示

### **3. OAuth同意画面の警告**
- **原因**: アプリが未認証
- **解決**: Google審査プロセスを完了

---

**📞 サポート**
- Google Cloud Console: https://console.cloud.google.com/
- Google OAuth 2.0: https://developers.google.com/identity/protocols/oauth2
- Supabase Auth: https://supabase.com/docs/guides/auth
- トモリエサポート: support@tomorie.jp