# トモリエ（Tomorie）Nativeアプリ開発ロードマップ

## 概要
シニア向けの使いやすさを重視したReact Nativeアプリの開発計画です。Webアプリと並行またはWebアプリ完成後に開発を進めます。

## 開発アプローチ

### アプローチ A: 並行開発（推奨）
- WebアプリとNativeアプリを並行開発
- 共通のSupabaseバックエンドを利用
- **期間**: Web開発と同期（5-6ヶ月）

### アプローチ B: 段階開発
- Webアプリ完成後にNativeアプリ開発
- Webでのユーザーフィードバックを反映
- **期間**: Web完成後+3-4ヶ月

## Native開発フェーズ

### Phase N1: Native基盤構築（2-3週間）
### Phase N2: Nativeコア機能（4-5週間）  
### Phase N3: Nativeコミュニティ機能（3-4週間）
### Phase N4: Native決済・プッシュ通知（2-3週間）
### Phase N5: Native品質向上・ストア申請（3-4週間）

## 技術スタック（Native）

### クロスプラットフォーム
- **Framework**: React Native 0.73+
- **Navigation**: React Navigation 6
- **State Management**: Zustand + React Query
- **UI Library**: NativeBase または React Native Elements

### iOS固有
- **Language**: Swift (Native modules)
- **Push Notifications**: APNs
- **In-App Purchase**: StoreKit (Stripe経由)
- **Deep Links**: Universal Links

### Android固有  
- **Language**: Kotlin (Native modules)
- **Push Notifications**: FCM
- **In-App Purchase**: Google Play Billing (Stripe経由)
- **Deep Links**: App Links

### 共通ライブラリ
- **Auth**: @supabase/supabase-js
- **Database**: Supabase Client
- **Images**: react-native-fast-image
- **Camera**: react-native-vision-camera
- **Maps**: react-native-maps
- **Analytics**: react-native-analytics

## 詳細チケット一覧

各フェーズの詳細なチケットは以下のファイルで管理：

- [Phase N1: Native基盤構築](./phase-n1-native-foundation.md)
- [Phase N2: Nativeコア機能](./phase-n2-native-core.md)
- [Phase N3: Nativeコミュニティ機能](./phase-n3-native-community.md)
- [Phase N4: Native決済・プッシュ通知](./phase-n4-native-payment.md)
- [Phase N5: Native品質向上・ストア申請](./phase-n5-native-release.md)

## シニア向けNative最適化

### 大きなタッチターゲット
- 最小サイズ: 48dp (Android) / 44pt (iOS)
- ボタン間の余白: 16dp以上
- スワイプ感度の調整

### 文字・視認性
- 最小フォントサイズ: 18sp/pt
- 高コントラスト対応
- ダークモード対応
- 文字サイズ調整機能

### 操作性
- 長押し操作の活用
- 誤タップ防止機能
- 音声フィードバック
- バイブレーション設定

### アクセシビリティ
- VoiceOver (iOS) / TalkBack (Android) 対応
- 色覚サポート
- 画面読み上げ最適化
- キーボードナビゲーション

## Native固有機能

### プッシュ通知
- 新しいマッチ通知
- メッセージ受信通知
- イベント開始リマインダー
- コミュニティ活動通知

### カメラ・ギャラリー
- プロフィール写真撮影
- 投稿画像アップロード
- 画像フィルター（シニア向け）
- 画像圧縮・最適化

### 位置情報
- 近くのユーザー検索
- イベント開催地表示
- GPS連携機能
- プライバシー設定

### オフライン対応
- 基本プロフィール表示
- メッセージ履歴閲覧
- オフライン時の通知
- 同期機能

---

**作成日**: 2024年6月17日  
**最終更新**: 2024年6月17日  
**作成者**: トモリエ開発チーム