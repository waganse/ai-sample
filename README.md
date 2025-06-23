# Tomorie（トモリエ）

60歳以上のシニア世代向けのマッチングプラットフォーム

## 環境設定

### 必要な環境変数

プロジェクトルートに `.env.local` ファイルを作成し、以下の環境変数を設定してください：

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Database URLs
DATABASE_URL=your_database_url
DIRECT_URL=your_direct_database_url

# 国土交通省 API Key（都道府県・市区町村データ取得用）
# APIキーの取得方法: https://www.mlit-data.jp/
KOKUDO_API_KEY=your_api_key_here

# OAuth Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_FACEBOOK_APP_ID=your_facebook_app_id
```

### 国土交通省 API について

都道府県・市区町村データの取得には、国土交通省のGraphQL APIを使用しています。

- **都道府県データ**: 国土交通省APIから動的取得
- **市区町村データ**: 国土交通省APIから都道府県コード指定で取得
- **フォールバック**: API障害時は静的データを使用

詳細な仕様については `docs/geo_api.md` を参照してください。

## 開発

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# データベースマイグレーション
npm run db:migrate

# Prismaスキーマの同期
npm run db:push
```

## 主要な技術スタック

- **フロントエンド**: Next.js 14 (App Router)、TypeScript、Tailwind CSS
- **バックエンド**: GraphQL (Apollo Server)、Prisma ORM
- **データベース**: PostgreSQL (Supabase)
- **認証**: Supabase Auth
- **地域データ**: 国土交通省 GraphQL API

## API仕様

### GraphQL

GraphQLエンドポイント: `/api/graphql`

主要なクエリ・ミューテーション：
- `prefectures`: 都道府県一覧取得
- `municipalities(prefectureName)`: 市区町村一覧取得
- `createProfile(input)`: プロフィール作成
- `me`: 現在のユーザー情報取得