# LINE認証設定ガイド

## 📱 LINE認証を選ぶ理由

### **シニア向けプラットフォームに最適**
- **普及率**: 日本で90%以上の利用率
- **使いやすさ**: シニア層でも馴染みのあるアプリ
- **信頼性**: LINEアカウントベースの確実な認証
- **パスワード不要**: 複雑なパスワード管理が不要

## 🔧 LINE Developers設定

### 1. **LINE Developersアカウント作成**

1. [LINE Developers Console](https://developers.line.biz/) にアクセス
2. LINEアカウントでログイン
3. 新規プロバイダーを作成
4. プロバイダー名: 「トモリエ」

### 2. **チャンネル作成**

1. **Create a new channel** をクリック
2. **LINE Login** を選択
3. 以下の情報を入力：

```
Channel name: トモリエ
Channel description: 60歳以上向けコミュニティプラットフォーム
App type: Web app
```

### 3. **チャンネル設定**

#### **基本設定**
```
Channel name: トモリエ
Channel description: 心に灯りをともす、シニア向けコミュニティ
App type: Web app
Email address: admin@tomorie.jp
Privacy policy URL: https://tomorie.jp/privacy
Terms of use URL: https://tomorie.jp/terms
```

#### **LINE Login設定**
```
Callback URL: https://your-project.supabase.co/auth/v1/callback

スコープ:
✓ profile (必須)
✓ openid (必須)  
✓ email (推奨)
```

### 4. **認証情報取得**

#### **Channel ID & Channel Secret**
```
Channel ID: 1234567890
Channel Secret: abcdef1234567890abcdef1234567890
```

⚠️ **Channel Secretは絶対に公開しないでください**

## ⚙️ Supabase設定

### 1. **Supabaseダッシュボード設定**

1. Supabase Dashboard → **Authentication** → **Providers**
2. **LINE** プロバイダーを探す
3. **Enable LINE provider** をオンにする

### 2. **認証情報設定**
```
Channel ID: [LINE Developersで取得したChannel ID]
Channel Secret: [LINE Developersで取得したChannel Secret]
Redirect URL: https://your-project.supabase.co/auth/v1/callback
```

### 3. **環境変数設定**

#### **.env.local**
```bash
# LINE認証設定
NEXT_PUBLIC_LINE_CHANNEL_ID=1234567890
LINE_CHANNEL_SECRET=abcdef1234567890abcdef1234567890
```

#### **.env.example** (既に追加済み)
```bash
# OAuth Configuration
NEXT_PUBLIC_LINE_CHANNEL_ID=your_line_channel_id_here
LINE_CHANNEL_SECRET=your_line_channel_secret_here
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

### 2. **LINEアイコン追加**

```typescript
// src/components/ui/Icons.tsx (既に実装済み)
line: (props: LucideProps) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
  </svg>
),
```

### 3. **ログイン画面のLINEボタン**

```typescript
// src/app/auth/login/page.tsx (既に実装済み)
<Button
  variant="outline"
  onClick={() => handleSocialLogin('line')}
  disabled={isLoading}
  className="w-full bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300"
>
  <Icons.line className="w-5 h-5 mr-3" />
  LINEでログイン
</Button>
```

## 🎨 UI/UXデザイン

### **LINEボタンのスタイリング**
- **カラー**: LINEブランドカラー（グリーン系）
- **背景**: `bg-green-50` (薄いグリーン)
- **ボーダー**: `border-green-200` (グリーンボーダー)
- **テキスト**: `text-green-700` (濃いグリーン)
- **ホバー**: `hover:bg-green-100` (ホバー時の色変化)

### **ボタンの配置順序**
1. **Google** (最も普及)
2. **LINE** (日本で人気)
3. **Facebook** (グローバル)

## 🔐 セキュリティ考慮事項

### **1. スコープの最小化**
```javascript
// 必要最小限のスコープのみ要求
スコープ: profile, openid, email
```

### **2. HTTPS必須**
- 本番環境では必ずHTTPS を使用
- リダイレクトURLもHTTPSで設定

### **3. 認証情報の保護**
- Channel Secretは環境変数で管理
- .env.local はgitignoreに追加
- 本番環境では環境変数で設定

### **4. CSRF対策**
- Supabaseが自動的にCSRF保護を提供
- stateパラメータによる検証

## 📱 ユーザーエクスペリエンス

### **シニア向けの配慮**
- **大きなボタン**: 44px以上の最小タップ領域
- **明確なラベル**: 「LINEでログイン」の分かりやすい表記
- **色分け**: LINEブランドカラーで識別しやすく
- **アイコン**: LINEのロゴで視覚的に理解しやすく

### **エラーハンドリング**
```typescript
try {
  await signInWithProvider('line');
} catch (error) {
  setError('LINE認証に失敗しました。もう一度お試しください。');
}
```

## 🧪 テスト方法

### **1. 開発環境でのテスト**
1. LINE認証ボタンをクリック
2. LINEログイン画面に遷移
3. 認証完了後、アプリに戻る
4. ユーザー情報が正しく取得される

### **2. 本番前の確認項目**
- [ ] Channel ID/Secret が正しく設定されている
- [ ] Callback URLが本番URLに更新されている
- [ ] HTTPS通信が機能している
- [ ] エラーハンドリングが適切に動作する

## 🚀 本番デプロイ時の注意

### **1. 環境変数の更新**
```bash
# 本番環境の環境変数
NEXT_PUBLIC_LINE_CHANNEL_ID=[本番用Channel ID]
LINE_CHANNEL_SECRET=[本番用Channel Secret]
```

### **2. LINE Developersでの本番設定**
- Callback URLを本番URLに変更
- アプリの審査が必要な場合は申請

### **3. 監視とログ**
- LINE認証の成功/失敗率を監視
- エラーログの確認
- ユーザーフィードバックの収集

---

**📞 サポート**
- LINE Developers: https://developers.line.biz/
- Supabase Auth: https://supabase.com/docs/guides/auth
- トモリエサポート: support@tomorie.jp