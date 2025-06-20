# Phase 1: 基盤構築（2-3週間）

## 概要
プロジェクトの基盤となるデータベース、認証システム、基本的なUIコンポーネントの構築を行います。

## チケット一覧

### F1-01: プロジェクト初期設定
**優先度**: 高  
**工数**: 0.5日  
**担当**: フロントエンド

#### 作業内容
- Next.js 14プロジェクトの初期化
- TypeScript設定
- Tailwind CSS設定
- ESLint/Prettier設定
- ディレクトリ構造の設計

#### 完了条件
- [ ] Next.js プロジェクトが正常に起動する
- [ ] TypeScript設定が完了している
- [ ] Tailwind CSSが適用されている
- [ ] コードフォーマット設定が動作する

---

### F1-02: Supabase プロジェクト設定
**優先度**: 高  
**工数**: 0.5日  
**担当**: バックエンド

#### 作業内容
- Supabaseプロジェクト作成
- 環境変数設定
- Supabase CLI設定
- 基本接続確認

#### 完了条件
- [ ] Supabaseプロジェクトが作成されている
- [ ] 環境変数が設定されている
- [ ] データベース接続が確認できる

---

### F1-03: Prisma ORM設定
**優先度**: 高  
**工数**: 1日  
**担当**: バックエンド

#### 作業内容
- Prisma初期化
- schema.prismaファイル作成（設計済みスキーマの実装）
- データベースマイグレーション実行
- Prisma Clientの生成と接続確認

#### 完了条件
- [ ] Prismaスキーマが実装されている
- [ ] マイグレーションが成功している
- [ ] Prisma Clientで基本的なCRUD操作ができる

---

### F1-04: シードデータ投入
**優先度**: 中  
**工数**: 0.5日  
**担当**: バックエンド

#### 作業内容
- seed.tsの実装（設計済みシードスクリプトの実装）
- サンプルユーザーデータ作成
- サンプルコミュニティデータ作成
- Stripeプランデータ作成

#### 完了条件
- [ ] シードスクリプトが正常に実行される
- [ ] サンプルデータが正しく投入される
- [ ] データベースにテストデータが揃っている

---

### F1-05: Supabase Auth設定
**優先度**: 高  
**工数**: 1日  
**担当**: フロントエンド

#### 作業内容
- Supabase Auth設定
- メール認証設定
- SSO（Google, LINE, Facebook）設定
- 認証フロー実装

#### 完了条件
- [ ] メール認証ができる
- [ ] Google SSOが動作する
- [ ] LINE SSOが動作する
- [ ] Facebook SSOが動作する

---

### F1-06: 基本レイアウト・共通コンポーネント
**優先度**: 高  
**工数**: 2日  
**担当**: フロントエンド

#### 作業内容
- レイアウトコンポーネント作成
- ヘッダー・フッター・ナビゲーション
- ボタン・フォーム・カードなどの基本コンポーネント
- シニア向けUI/UXガイドラインの適用

#### 完了条件
- [ ] 基本レイアウトが動作する
- [ ] 共通コンポーネントが利用可能
- [ ] シニア向けデザインが適用されている
- [ ] レスポンシブデザインが実装されている

---

### F1-07: 認証画面実装
**優先度**: 高  
**工数**: 2日  
**担当**: フロントエンド

#### 作業内容
- ウェルカム画面
- ログイン/登録画面
- 認証コード入力画面
- 認証フロー統合

#### 完了条件
- [ ] 全ての認証画面が実装されている
- [ ] 認証フローが正常に動作する
- [ ] エラーハンドリングが実装されている
- [ ] UI/UXデザインに準拠している

---

### F1-08: プロフィール初期設定画面
**優先度**: 高  
**工数**: 3日  
**担当**: フロントエンド

#### 作業内容
- 4ステップのプロフィール設定画面
- ステップ1: 基本情報（名前、生年月日、性別）
- ステップ2: 居住地・職業
- ステップ3: 趣味・関心事
- ステップ4: 出会いの目的・写真・自己紹介

#### 完了条件
- [ ] 4つのステップが全て実装されている
- [ ] データ入力バリデーションが動作する
- [ ] ステップ間の遷移が正常に動作する
- [ ] データベースへの保存が正常に動作する

---

### F1-09: 画像アップロード機能
**優先度**: 中  
**工数**: 1.5日  
**担当**: フロントエンド + バックエンド

#### 作業内容
- Supabase Storage設定
- 画像アップロード機能実装
- 画像リサイズ・圧縮
- プロフィール写真管理

#### 完了条件
- [ ] 画像アップロードが動作する
- [ ] 画像が適切にリサイズされる
- [ ] 複数枚の写真管理ができる
- [ ] セキュリティが確保されている

---

### F1-10: 基本ナビゲーション
**優先度**: 中  
**工数**: 1日  
**担当**: フロントエンド

#### 作業内容
- タブナビゲーション実装
- ページルーティング設定
- ナビゲーション状態管理
- アクセス制御

#### 完了条件
- [ ] 5つのメインタブが動作する
- [ ] ページ遷移が正常に動作する
- [ ] 認証状態によるアクセス制御が動作する

---

## Phase 1 完了条件

### 必須条件
- [ ] ユーザー登録・ログインができる
- [ ] プロフィール設定ができる
- [ ] 基本的なナビゲーションが動作する
- [ ] データベースにデータが正常に保存される

### 確認事項
- [ ] 60歳以上の年齢制限が正常に動作する
- [ ] シニア向けUIガイドラインに準拠している
- [ ] 基本的なエラーハンドリングが実装されている
- [ ] モバイル・タブレット・デスクトップで動作する

---

**見積もり工数**: 12-14人日  
**推奨期間**: 2-3週間  
**次フェーズ**: [Phase 2: コア機能開発](./phase-2-core-features.md)