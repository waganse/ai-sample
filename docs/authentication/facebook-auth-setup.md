# Facebook認証設定ガイド

## 👥 Facebook認証を選ぶ理由

### **シニア向けプラットフォームに最適**
- **普及率**: 全世界で30億人以上のユーザー
- **馴染みやすさ**: 多くのシニア層が既にFacebookアカウントを保有
- **信頼性**: Meta（Facebook）の高セキュリティ認証
- **パスワード不要**: 既存のFacebookアカウントでワンクリック認証

## 🔧 Facebook Developers設定

### 1. **Facebook Developersアカウント作成**

1. [Facebook Developers](https://developers.facebook.com/) にアクセス
2. Facebookアカウントでログイン
3. **Developer アカウント**として登録
4. 開発者利用規約に同意

### 2. **アプリの作成**

1. **マイアプリ** → **アプリを作成**をクリック
2. **消費者** を選択（一般ユーザー向け）
3. 以下の情報を入力：

```
アプリ名: トモリエ
アプリの連絡先メールアドレス: admin@tomorie.jp
アプリの目的: ソーシャルコミュニティプラットフォーム
```

### 3. **Facebook Loginの設定**

1. **プロダクトを追加** → **Facebook Login** → **設定**
2. **ウェブ** を選択
3. **サイトURL**: `https://tomorie.jp`

#### **Facebook Login設定**
```
有効なOAuth リダイレクトURI:
- https://your-project.supabase.co/auth/v1/callback

Client OAuth 設定:
✓ ウェブOAuthログイン: オン
✓ HTTPSを強制: オン (本番環境)
```

### 4. **基本設定**

#### **アプリドメイン**
```
アプリドメイン:
- tomorie.jp
- your-project.supabase.co
```

#### **プライバシーポリシーURL**
```
プライバシーポリシーURL: https://tomorie.jp/privacy
利用規約URL: https://tomorie.jp/terms
```

### 5. **認証情報取得**

#### **アプリID & アプリシークレット**
```
アプリID: 123456789012345
アプリシークレット: abc123def456ghi789jkl012mno345pqr
```

⚠️ **アプリシークレットは絶対に公開しないでください**

## ⚙️ Supabase設定

### 1. **Supabaseダッシュボード設定**

1. Supabase Dashboard → **Authentication** → **Providers**
2. **Facebook** プロバイダーを探す
3. **Enable Facebook provider** をオンにする

### 2. **認証情報設定**
```
Facebook App ID: [Facebook Developersで取得したアプリID]
Facebook App Secret: [Facebook Developersで取得したアプリシークレット]
Redirect URL: https://your-project.supabase.co/auth/v1/callback
```

### 3. **環境変数設定**

#### **.env.local**
```bash
# Facebook認証設定
NEXT_PUBLIC_FACEBOOK_APP_ID=123456789012345
FACEBOOK_APP_SECRET=abc123def456ghi789jkl012mno345pqr
```

#### **.env.example** (既に追加済み)
```bash
# OAuth Configuration
NEXT_PUBLIC_FACEBOOK_APP_ID=your_facebook_app_id_here
FACEBOOK_APP_SECRET=your_facebook_app_secret_here
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

### 2. **Facebookアイコン追加**

```typescript
// src/components/ui/Icons.tsx (既に実装済み)
facebook: (props: LucideProps) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
  </svg>
),
```

### 3. **ログイン画面のFacebookボタン**

```typescript
// src/app/auth/login/page.tsx (既に実装済み)
<Button
  variant="outline"
  onClick={() => handleSocialLogin('facebook')}
  disabled={isLoading}
  className="w-full"
>
  <Icons.facebook className="w-5 h-5 mr-3" />
  Facebookでログイン
</Button>
```

## 🎨 UI/UXデザイン

### **Facebookボタンのスタイリング**
- **カラー**: Facebookブランドカラー（#1877F2）
- **背景**: `bg-white` (白背景)
- **ボーダー**: `border-gray-200` (グレーボーダー)
- **テキスト**: `text-gray-700` (ダークグレー)
- **ホバー**: `hover:bg-blue-50` (ホバー時の色変化)

### **ボタンの配置順序**
1. **Google** (最も普及)
2. **LINE** (日本で人気)
3. **Facebook** (グローバル)

## 🔐 セキュリティ考慮事項

### **1. スコープの最小化**
```javascript
// 必要最小限のスコープのみ要求（Supabaseが自動管理）
スコープ: public_profile, email
```

### **2. HTTPS必須**
- 本番環境では必ずHTTPS を使用
- リダイレクトURLもHTTPSで設定

### **3. 認証情報の保護**
- アプリシークレットは環境変数で管理
- .env.local はgitignoreに追加
- 本番環境では環境変数で設定

### **4. CSRF対策**
- Supabaseが自動的にCSRF保護を提供
- stateパラメータによる検証

### **5. ドメイン制限**
- アプリドメインの適切な設定
- 不正なドメインからのアクセス防止

## 📱 ユーザーエクスペリエンス

### **シニア向けの配慮**
- **大きなボタン**: 44px以上の最小タップ領域
- **明確なラベル**: 「Facebookでログイン」の分かりやすい表記
- **色分け**: Facebookブランドカラーで識別しやすく
- **アイコン**: Facebookのロゴで視覚的に理解しやすく

### **権限の説明**
- Facebook認証で取得する情報の説明
- プライバシーへの配慮を明示
- 必要最小限の権限のみ要求

### **エラーハンドリング**
```typescript
try {
  await signInWithProvider('facebook');
} catch (error) {
  setError('Facebook認証に失敗しました。もう一度お試しください。');
}
```

## 🧪 テスト方法

### **1. 開発環境でのテスト**
1. Facebook認証ボタンをクリック
2. Facebookログイン画面に遷移
3. Facebookアカウントで認証
4. 権限の確認・許可
5. 認証完了後、アプリに戻る
6. ユーザー情報が正しく取得される

### **2. 本番前の確認項目**
- [ ] アプリID/シークレット が正しく設定されている
- [ ] Callback URLが本番URLに更新されている
- [ ] HTTPS通信が機能している
- [ ] エラーハンドリングが適切に動作する
- [ ] Facebook Login権限が適切に設定されている

## 🚀 本番デプロイ時の注意

### **1. 環境変数の更新**
```bash
# 本番環境の環境変数
NEXT_PUBLIC_FACEBOOK_APP_ID=[本番用アプリID]
FACEBOOK_APP_SECRET=[本番用アプリシークレット]
```

### **2. Facebook Developersでの本番設定**
- 有効なOAuth リダイレクトURIを本番URLに変更
- アプリドメインに本番ドメインを追加
- アプリを「ライブ」モードに変更

### **3. アプリレビュー**
- 基本的な権限（public_profile, email）は審査不要
- 追加権限が必要な場合はFacebookの審査を申請

### **4. 監視とログ**
- Facebook認証の成功/失敗率を監視
- エラーログの確認
- ユーザーフィードバックの収集

### **5. Facebook APIの制限**
- API使用量の監視
- レート制限の確認

## 📋 よくある問題と解決方法

### **1. redirect_uri エラー**
- **原因**: リダイレクトURIが登録されていない
- **解決**: Facebook DevelopersでリダイレクトURIを正しく設定

### **2. App Not Setup エラー**
- **原因**: Facebook Loginが正しく設定されていない
- **解決**: プロダクト設定でFacebook Loginを有効化

### **3. Invalid App ID エラー**
- **原因**: アプリIDが間違っている
- **解決**: 環境変数とFacebook Developersの設定を確認

### **4. アプリが開発モード**
- **原因**: アプリがまだ開発モードになっている
- **解決**: アプリを「ライブ」モードに変更

### **5. 権限エラー**
- **原因**: 必要な権限が許可されていない
- **解決**: 権限の再許可またはアプリレビューの申請

## 📱 モバイル対応

### **Facebook Mobile SDK**
- モバイルアプリ版を開発する場合は別途SDK設定が必要
- iOS: Facebook SDK for iOS
- Android: Facebook SDK for Android

### **Progressive Web App (PWA)**
- PWAとしてインストールした場合の認証フロー確認
- モバイルブラウザでの動作検証

---

**📞 サポート**
- Facebook Developers: https://developers.facebook.com/
- Facebook Login: https://developers.facebook.com/docs/facebook-login/
- Supabase Auth: https://supabase.com/docs/guides/auth
- トモリエサポート: support@tomorie.jp