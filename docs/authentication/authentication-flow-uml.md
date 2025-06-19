# トモリエ認証機能 UMLフロー図

## 📊 シーケンス図

### 1. メール認証フロー（ログイン）

```mermaid
sequenceDiagram
    participant User as ユーザー
    participant LoginPage as ログインページ
    participant useAuth as useAuthフック
    participant CheckAPI as /api/auth/check-user
    participant Supabase as Supabase Auth
    participant EmailService as メールサービス
    participant Database as データベース

    User->>LoginPage: メールアドレス入力
    LoginPage->>useAuth: signInWithEmail(email)
    
    useAuth->>CheckAPI: POST /api/auth/check-user
    CheckAPI->>Database: SELECT * FROM users WHERE email = ?
    Database-->>CheckAPI: ユーザー情報 or null
    
    alt ユーザーが存在しない
        CheckAPI-->>useAuth: {exists: false}
        useAuth-->>LoginPage: エラー: "登録されていません"
        LoginPage-->>User: エラー表示 + 新規登録案内
    else ユーザーが未確認
        CheckAPI-->>useAuth: {exists: true, confirmed: false}
        useAuth-->>LoginPage: エラー: "メール確認が必要"
        LoginPage-->>User: エラー表示 + メール確認案内
    else ユーザーが確認済み
        CheckAPI-->>useAuth: {exists: true, confirmed: true}
        useAuth->>Supabase: signInWithOtp(email, shouldCreateUser: false)
        Supabase->>EmailService: OTPメール送信
        EmailService-->>User: 認証コードメール
        Supabase-->>useAuth: 成功
        useAuth-->>LoginPage: 成功
        LoginPage-->>User: コード入力画面表示
        
        User->>LoginPage: 認証コード入力
        LoginPage->>useAuth: verifyOtp(email, code)
        useAuth->>Supabase: verifyOtp()
        Supabase-->>useAuth: セッション作成
        useAuth-->>LoginPage: 認証成功
        LoginPage-->>User: ダッシュボードへリダイレクト
    end
```

### 2. メール認証フロー（新規登録）

```mermaid
sequenceDiagram
    participant User as ユーザー
    participant RegisterPage as 登録ページ
    participant useAuth as useAuthフック
    participant CheckAPI as /api/auth/check-user
    participant Supabase as Supabase Auth
    participant EmailService as メールサービス
    participant Database as データベース

    User->>RegisterPage: メールアドレス入力 + 利用規約同意
    RegisterPage->>useAuth: signUpWithEmail(email)
    
    useAuth->>CheckAPI: POST /api/auth/check-user
    CheckAPI->>Database: SELECT * FROM users WHERE email = ?
    Database-->>CheckAPI: ユーザー情報 or null
    
    alt ユーザーが既に存在（確認済み）
        CheckAPI-->>useAuth: {exists: true, confirmed: true}
        useAuth-->>RegisterPage: エラー: "既に登録済み"
        RegisterPage-->>User: エラー表示 + ログイン案内
    else ユーザーが存在（未確認）
        CheckAPI-->>useAuth: {exists: true, confirmed: false}
        useAuth-->>RegisterPage: エラー: "メール確認が必要"
        RegisterPage-->>User: エラー表示 + メール確認案内
    else 新規ユーザー
        CheckAPI-->>useAuth: {exists: false}
        useAuth->>Supabase: signInWithOtp(email, shouldCreateUser: true)
        Supabase->>EmailService: 確認メール送信
        EmailService-->>User: 確認メール
        Supabase-->>useAuth: 成功
        useAuth-->>RegisterPage: 成功
        RegisterPage-->>User: コード入力画面表示
        
        User->>RegisterPage: 認証コード入力
        RegisterPage->>useAuth: verifyOtp(email, code)
        useAuth->>Supabase: verifyOtp()
        Supabase->>Database: ユーザー作成 + プロファイル初期化
        Supabase-->>useAuth: セッション作成
        useAuth-->>RegisterPage: 認証成功
        RegisterPage-->>User: プロファイル設定ページへリダイレクト
    end
```

### 3. ソーシャル認証フロー（Google/Facebook/LINE共通）

```mermaid
sequenceDiagram
    participant User as ユーザー
    participant LoginPage as ログイン/登録ページ
    participant useAuth as useAuthフック
    participant Supabase as Supabase Auth
    participant Provider as OAuth Provider
    participant CallbackPage as コールバックページ
    participant Database as データベース

    User->>LoginPage: ソーシャルログインボタンクリック
    LoginPage->>useAuth: signInWithProvider(provider)
    useAuth->>Supabase: signInWithOAuth(provider, redirectTo)
    Supabase-->>User: OAuth プロバイダーへリダイレクト
    
    User->>Provider: ログイン認証
    Provider->>User: 認証情報確認・同意
    User->>Provider: 同意
    Provider-->>CallbackPage: 認証コード付きでリダイレクト
    
    CallbackPage->>Supabase: 認証コード交換
    Supabase->>Provider: アクセストークン取得
    Provider-->>Supabase: ユーザー情報 + アクセストークン
    
    alt 新規ユーザー
        Supabase->>Database: ユーザー作成 + プロファイル初期化
        Database-->>Supabase: 作成完了
        Supabase-->>CallbackPage: セッション作成
        CallbackPage-->>User: プロファイル設定ページへリダイレクト
    else 既存ユーザー
        Supabase->>Database: ユーザー情報更新
        Database-->>Supabase: 更新完了
        Supabase-->>CallbackPage: セッション作成
        CallbackPage-->>User: ダッシュボードへリダイレクト
    end
```

## 🏗️ クラス図

```mermaid
classDiagram
    class useAuth {
        +User user
        +boolean loading
        +signInWithEmail(email: string)
        +signUpWithEmail(email: string) 
        +signInWithProvider(provider: string)
        +signOut()
        +verifyOtp(email: string, token: string)
    }

    class LoginPage {
        -string email
        -boolean isLoading
        -boolean isCodeSent
        -string verificationCode
        -string error
        +handleEmailSubmit()
        +handleCodeVerification()
        +handleSocialLogin(provider: string)
    }

    class RegisterPage {
        -string email
        -boolean isLoading
        -boolean isCodeSent
        -string verificationCode
        -string error
        -boolean agreedToTerms
        +handleEmailSubmit()
        +handleCodeVerification()
        +handleSocialSignUp(provider: string)
    }

    class CheckUserAPI {
        +POST(request: NextRequest)
        -checkUserExists(email: string)
        -validateUserStatus(user: User)
    }

    class SupabaseClient {
        +auth: AuthClient
        +signInWithOtp(options: OtpOptions)
        +signInWithOAuth(options: OAuthOptions)
        +verifyOtp(options: VerifyOptions)
        +signOut()
        +getSession()
        +onAuthStateChange(callback: Function)
    }

    class EmailService {
        +sendOtpEmail(email: string, code: string)
        +sendWelcomeEmail(user: User)
        +sendConfirmationEmail(user: User)
    }

    class Database {
        +users: Table
        +profiles: Table
        +email_notifications: Table
        +email_logs: Table
    }

    useAuth --> SupabaseClient
    useAuth --> CheckUserAPI
    LoginPage --> useAuth
    RegisterPage --> useAuth
    CheckUserAPI --> Database
    SupabaseClient --> EmailService
    SupabaseClient --> Database
```

## 🔄 状態遷移図

```mermaid
stateDiagram-v2
    [*] --> 未認証
    
    未認証 --> ログイン画面 : ログインボタンクリック
    未認証 --> 登録画面 : 新規登録ボタンクリック
    
    ログイン画面 --> メール入力中 : メールアドレス入力
    メール入力中 --> ユーザー確認中 : 送信ボタンクリック
    
    ユーザー確認中 --> エラー表示 : ユーザー不存在/未確認
    ユーザー確認中 --> OTP送信中 : ユーザー確認済み
    エラー表示 --> ログイン画面 : エラー解除
    
    OTP送信中 --> コード入力画面 : OTP送信成功
    コード入力画面 --> 認証中 : コード入力
    認証中 --> 認証済み : 認証成功
    認証中 --> コード入力画面 : 認証失敗
    
    登録画面 --> メール入力中 : メールアドレス入力
    
    ログイン画面 --> OAuth認証中 : ソーシャルログインボタン
    登録画面 --> OAuth認証中 : ソーシャル登録ボタン
    OAuth認証中 --> プロバイダー認証 : プロバイダーサイトへ
    プロバイダー認証 --> コールバック処理 : 認証完了
    コールバック処理 --> 認証済み : セッション作成
    
    認証済み --> ダッシュボード : 既存ユーザー
    認証済み --> プロファイル設定 : 新規ユーザー
    
    認証済み --> 未認証 : ログアウト
```

## 🛡️ セキュリティフロー図

```mermaid
flowchart TD
    A[ユーザー認証開始] --> B{認証方法選択}
    
    B -->|メール認証| C[メールアドレス入力]
    B -->|ソーシャル認証| D[OAuth プロバイダー選択]
    
    C --> E[ユーザー存在確認API]
    E --> F{ユーザー状態確認}
    
    F -->|存在しない| G[エラー: 未登録]
    F -->|未確認| H[エラー: メール未確認]
    F -->|確認済み| I[OTP送信]
    
    G --> J[新規登録案内]
    H --> K[メール確認案内]
    I --> L[認証コード入力]
    
    L --> M[OTP検証]
    M --> N{検証結果}
    N -->|成功| O[セッション作成]
    N -->|失敗| P[エラー表示]
    
    D --> Q[プロバイダー認証]
    Q --> R[認証情報検証]
    R --> S{新規ユーザー?}
    S -->|Yes| T[ユーザー作成]
    S -->|No| U[ユーザー情報更新]
    
    T --> O
    U --> O
    O --> V[認証完了]
    
    P --> L
    J --> W[登録画面へ]
    K --> X[メール確認待ち]
    
    style G fill:#ffebee
    style H fill:#fff3e0
    style P fill:#ffebee
    style O fill:#e8f5e8
    style V fill:#e8f5e8
```

## 📋 認証フローの特徴

### ✅ **セキュリティ機能**
1. **事前ユーザー確認** - 未登録ユーザーへのスパム防止
2. **メール確認状態チェック** - 未確認ユーザーの適切な案内
3. **OAuth安全性** - CSRF保護、state検証
4. **セッション管理** - Supabase標準のセキュアセッション

### ✅ **ユーザビリティ**
1. **シニア向けUI** - 大きなボタン、明確なラベル
2. **エラーハンドリング** - 分かりやすいエラーメッセージと案内
3. **フロー分岐** - ログイン/登録の適切な振り分け
4. **利用規約同意** - GDPR対応の明示的同意

### ✅ **技術的特徴**
1. **型安全性** - TypeScript完全対応
2. **状態管理** - React Hooks活用
3. **API分離** - 認証ロジックの分離
4. **拡張性** - 新しいプロバイダー追加容易

この認証システムは、シニア向けサービスに特化した安全で使いやすい設計となっています。