# トモリエ（Tomorie）開発ロードマップ

## 開発フェーズ概要

### Phase 1: 基盤構築（2-3週間）
- データベース・認証・基本UI構築
- プロジェクト初期設定とインフラ構築

### Phase 2: コア機能開発（4-5週間）
- ユーザー管理・マッチング・メッセージ機能
- 基本的なアプリ体験の実装

### Phase 3: コミュニティ機能（3-4週間）
- コミュニティ・イベント・投稿機能
- ソーシャル機能の充実

### Phase 4: 決済・管理機能（2-3週間）
- Stripe決済統合・管理画面
- 運用に必要な機能の実装

### Phase 5: 品質向上・リリース準備（2-3週間）
- テスト・パフォーマンス最適化・デプロイ
- 本番リリース準備

## 詳細チケット一覧

### Webアプリ開発
各フェーズの詳細なチケットは以下のファイルで管理：

- [Phase 1: 基盤構築](./phase-1-foundation.md)
- [Phase 2: コア機能開発](./phase-2-core-features.md)
- [Phase 3: コミュニティ機能](./phase-3-community.md)
- [Phase 4: 決済・管理機能](./phase-4-payment-admin.md)
- [Phase 5: 品質向上・リリース準備](./phase-5-quality-release.md)

### Nativeアプリ開発
Nativeアプリの開発計画は以下のファイルで管理：

- [Nativeアプリ開発ロードマップ](./native-app-roadmap.md)
- [Phase N1: Native基盤構築](./phase-n1-native-foundation.md)
- [Phase N2: Nativeコア機能](./phase-n2-native-core.md)
- [Phase N3: Nativeコミュニティ機能](./phase-n3-native-community.md)
- [Phase N4: Native決済・プッシュ通知](./phase-n4-native-payment.md)
- [Phase N5: Native品質向上・ストア申請](./phase-n5-native-release.md)

### 全体サマリー
- [Web開発全体サマリー](./development-summary.md)
- [Native開発全体サマリー](./native-development-summary.md)

## 技術スタック

### フロントエンド
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma Client
- Supabase Auth (Client)

### バックエンド
- Supabase (PostgreSQL + Auth + Storage + Realtime)
- Prisma ORM
- Stripe (決済)

### インフラ・デプロイ
- Vercel (フロントエンド)
- Supabase (バックエンド)
- GitHub Actions (CI/CD)

---

**作成日**: 2024年6月17日  
**最終更新**: 2024年6月17日  
**作成者**: トモリエ開発チーム