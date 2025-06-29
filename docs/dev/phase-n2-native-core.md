# Phase N2: Nativeコア機能（4-5週間）

## 概要
ユーザー管理、マッチング機能、メッセージ機能のNative実装を行います。Native特有のUX向上も含みます。

## チケット一覧

### N2-01: プロフィール設定画面（Native UX）
**優先度**: 高  
**工数**: 3日  
**担当**: Native開発者

#### 作業内容
- 4ステップ プロフィール設定
- ネイティブスライダー・ピッカー
- フォームバリデーション
- 進捗表示・ステップ管理

#### 完了条件
- [ ] 4ステップが滑らかに遷移する
- [ ] ネイティブUIコンポーネントが使用されている
- [ ] バリデーションが動作する
- [ ] データが正常に保存される

---

### N2-02: カメラ・写真機能（高品質）
**優先度**: 高  
**工数**: 3日  
**担当**: Native開発者

#### 作業内容
- 高品質カメラ撮影
- 複数写真選択・管理
- 写真編集機能（基本）
- 写真アップロード最適化

#### 完了条件
- [ ] 高品質な写真が撮影できる
- [ ] 複数写真を管理できる
- [ ] 基本的な編集ができる
- [ ] アップロードが高速

---

### N2-03: ユーザープロフィール表示
**優先度**: 高  
**工数**: 2.5日  
**担当**: Native開発者

#### 作業内容
- プロフィール詳細画面
- 写真ギャラリー表示
- スワイプ・ジェスチャー対応
- プロフィール編集画面

#### 完了条件
- [ ] プロフィールが美しく表示される
- [ ] 写真ギャラリーが動作する
- [ ] ジェスチャー操作が快適
- [ ] 編集機能が動作する

---

### N2-04: マッチング画面（スワイプUI）
**優先度**: 高  
**工数**: 4日  
**担当**: Native開発者

#### 作業内容
- カード型スワイプUI
- いいね・パス・メッセージボタン
- アニメーション実装
- マッチング候補取得

#### 完了条件
- [ ] スワイプ操作が滑らか
- [ ] アニメーションが美しい
- [ ] ボタン操作が快適
- [ ] 候補が適切に表示される

---

### N2-05: マッチング機能・通知
**優先度**: 高  
**工数**: 2.5日  
**担当**: Native開発者

#### 作業内容
- いいね送信・受信
- マッチ成立処理
- マッチ通知（プッシュ・インアプリ）
- マッチ一覧表示

#### 完了条件
- [ ] いいね機能が動作する
- [ ] マッチが成立する
- [ ] 通知が適切に送信される
- [ ] マッチ一覧が表示される

---

### N2-06: メッセージ画面（Native UX）
**優先度**: 高  
**工数**: 4日  
**担当**: Native開発者

#### 作業内容
- メッセージ一覧画面
- 個別チャット画面
- リアルタイム更新
- メッセージ入力最適化

#### 完了条件
- [ ] メッセージ一覧が表示される
- [ ] チャット画面が快適に動作する
- [ ] リアルタイム更新が動作する
- [ ] 入力体験が最適化されている

---

### N2-07: リアルタイムメッセージ（Native最適化）
**優先度**: 高  
**工数**: 2.5日  
**担当**: Native開発者

#### 作業内容
- WebSocket接続管理
- バックグラウンド更新
- 接続状態表示
- オフライン対応

#### 完了条件
- [ ] リアルタイム更新が安定している
- [ ] バックグラウンドでも動作する
- [ ] 接続状態が適切に表示される
- [ ] オフライン時も適切に動作する

---

### N2-08: プッシュ通知（詳細実装）
**優先度**: 高  
**工数**: 3日  
**担当**: Native開発者

#### 作業内容
- マッチ・メッセージ通知
- 通知タップ時の画面遷移
- 通知設定画面
- バッジ管理

#### 完了条件
- [ ] 各種プッシュ通知が送信される
- [ ] タップ時に適切な画面に遷移する
- [ ] 通知設定ができる
- [ ] バッジが正しく管理される

---

### N2-09: 検索・フィルター機能
**優先度**: 中  
**工数**: 3日  
**担当**: Native開発者

#### 作業内容
- 検索画面実装
- フィルター設定画面
- 検索結果表示
- フィルター設定保存

#### 完了条件
- [ ] ユーザー検索ができる
- [ ] 詳細フィルターが設定できる
- [ ] 検索結果が適切に表示される
- [ ] 設定が保存される

---

### N2-10: ユーザー設定・アカウント管理
**優先度**: 中  
**工数**: 2.5日  
**担当**: Native開発者

#### 作業内容
- 設定画面実装
- アカウント情報変更
- プライバシー設定
- アカウント削除機能

#### 完了条件
- [ ] 設定画面が実装されている
- [ ] アカウント情報を変更できる
- [ ] プライバシー設定ができる
- [ ] アカウント削除ができる

---

### N2-11: 位置情報機能
**優先度**: 中  
**工数**: 2.5日  
**担当**: Native開発者

#### 作業内容
- 位置情報取得・更新
- 近くのユーザー表示
- 位置情報プライバシー設定
- GPS精度管理

#### 完了条件
- [ ] 位置情報が取得される
- [ ] 近くのユーザーが表示される
- [ ] プライバシー設定が動作する
- [ ] GPS精度が管理されている

---

### N2-12: ブロック・通報機能
**優先度**: 中  
**工数**: 2日  
**担当**: Native開発者

#### 作業内容
- ユーザーブロック機能
- 通報機能実装
- ブロック一覧管理
- 通報理由選択UI

#### 完了条件
- [ ] ユーザーをブロックできる
- [ ] 不適切コンテンツを通報できる
- [ ] ブロック一覧が管理できる
- [ ] 通報理由を選択できる

---

### N2-13: オフライン機能・同期
**優先度**: 中  
**工数**: 3日  
**担当**: Native開発者

#### 作業内容
- オフラインデータ保存
- 同期機能実装
- オフライン表示
- 接続復旧時の自動同期

#### 完了条件
- [ ] オフライン時もデータが表示される
- [ ] 同期機能が動作する
- [ ] オフライン状態が表示される
- [ ] 自動同期が動作する

---

### N2-14: Native固有機能最適化
**優先度**: 中  
**工数**: 2日  
**担当**: Native開発者

#### 作業内容
- ハプティックフィードバック
- 音声フィードバック
- ジェスチャー最適化
- アニメーション最適化

#### 完了条件
- [ ] ハプティックフィードバックが動作する
- [ ] 音声フィードバックが動作する
- [ ] ジェスチャーが最適化されている
- [ ] アニメーションが滑らか

---

### N2-15: パフォーマンス最適化
**優先度**: 中  
**工数**: 2日  
**担当**: Native開発者

#### 作業内容
- 画像読み込み最適化
- メモリ使用量最適化
- バッテリー消費最適化
- 起動時間最適化

#### 完了条件
- [ ] 画像読み込みが高速
- [ ] メモリ使用量が適切
- [ ] バッテリー消費が最適化されている
- [ ] 起動時間が短縮されている

---

## Phase N2 完了条件

### 必須条件
- [ ] ユーザー管理機能が動作する
- [ ] マッチング機能が動作する
- [ ] メッセージ機能が動作する
- [ ] プッシュ通知が動作する

### 確認事項
- [ ] Native特有のUXが実装されている
- [ ] オフライン機能が動作する
- [ ] パフォーマンスが良好
- [ ] アクセシビリティ対応ができている

---

**見積もり工数**: 32-38人日  
**推奨期間**: 4-5週間  
**前フェーズ**: [Phase N1: Native基盤構築](./phase-n1-native-foundation.md)  
**次フェーズ**: [Phase N3: Nativeコミュニティ機能](./phase-n3-native-community.md)