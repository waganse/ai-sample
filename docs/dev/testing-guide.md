# テスト自動化ガイド

## 概要
Tomorieプロジェクトのテスト自動化環境の構築と使用方法について説明します。

## テスト環境の構成

### 1. 単体テスト・統合テスト
- **Jest**: JavaScriptテストフレームワーク
- **React Testing Library**: Reactコンポーネントのテスト
- **Jest DOM**: DOM要素のマッチャー拡張

### 2. E2Eテスト
- **Playwright**: ブラウザ自動化ツール
- **複数ブラウザ対応**: Chrome, Firefox, Safari
- **モバイルテスト**: iOS Safari, Android Chrome

### 3. CI/CD
- **GitHub Actions**: 自動テスト実行
- **Coverage報告**: Codecov連携

## テストの実行方法

### 単体テスト
```bash
# 開発時（ウォッチモード）
npm run test

# CI用（カバレッジ付き）
npm run test:ci

# デバッグモード
npm run test:debug
```

### E2Eテスト
```bash
# 全てのE2Eテスト実行
npm run test:e2e

# UI表示付きで実行
npm run test:e2e:ui

# 特定のテストファイルのみ実行
npx playwright test navigation.spec.ts

# 特定のブラウザでのみ実行
npx playwright test --project=chromium
```

## テストファイルの構成

### ディレクトリ構造
```
src/
├── components/
│   └── ui/
│       ├── __tests__/          # コンポーネントテスト
│       │   ├── Button.test.tsx
│       │   └── ...
│       └── Button.tsx
├── app/
│   ├── __tests__/              # ページテスト
│   │   ├── page.test.tsx
│   │   └── ...
│   └── page.tsx
e2e/
├── navigation.spec.ts          # ナビゲーションテスト
├── auth.spec.ts               # 認証フローテスト
├── pricing.spec.ts            # 料金ページテスト
└── ...
```

### 命名規則
- **単体テスト**: `*.test.tsx` または `*.spec.tsx`
- **E2Eテスト**: `*.spec.ts`
- **テストディレクトリ**: `__tests__/`

## テストケースの作成

### 単体テストの例
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### E2Eテストの例
```typescript
import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test('should navigate to concept page', async ({ page }) => {
    await page.goto('/');
    await page.click('text=私たちの想いを知る');
    await expect(page).toHaveURL('/concept');
    await expect(page.locator('h1')).toContainText('あなたの物語が');
  });
});
```

## モックの使用

### 外部依存関係のモック
```typescript
// jest.setup.js にて設定済み

// Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '',
  useSearchParams: () => new URLSearchParams(),
}));

// Supabase
jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(() => ({
    auth: { /* モックメソッド */ },
  })),
}));
```

## テストデータの管理

### テスト用データファクトリー
```typescript
// __tests__/factories/user.ts
export const createMockUser = (overrides = {}) => ({
  id: 'test-user-id',
  email: 'test@example.com',
  displayName: 'テストユーザー',
  ...overrides,
});
```

## 継続的インテグレーション

### GitHub Actions ワークフロー
```yaml
# .github/workflows/test.yml
name: Test & Build
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm run test:ci
```

## カバレッジ設定

### Jest カバレッジ設定
```javascript
// jest.config.js
collectCoverageFrom: [
  'src/**/*.{js,jsx,ts,tsx}',
  '!src/**/*.d.ts',
  '!src/pages/api/**/*',
  '!src/app/api/**/*',
],
```

### カバレッジ目標
- **行カバレッジ**: 80%以上
- **関数カバレッジ**: 80%以上
- **ブランチカバレッジ**: 75%以上

## テストのベストプラクティス

### 単体テスト
1. **AAA パターン**: Arrange, Act, Assert
2. **一つのテストに一つの責任**
3. **テスト名は動作を明確に説明**
4. **外部依存関係はモック化**

### E2Eテスト
1. **ユーザーの重要なフローをテスト**
2. **ブラウザ間の互換性を確認**
3. **モバイル対応をテスト**
4. **実際のユーザー操作を模倣**

### 共通
1. **DRY原則**: 重複するテストコードを避ける
2. **Fast Feedback**: 早期にエラーを検出
3. **Deterministic**: 毎回同じ結果になること
4. **Independent**: テスト間の依存関係を避ける

## トラブルシューティング

### よくある問題と解決方法

#### Jest実行時のエラー
```bash
# Node.js バージョンが原因の場合
nvm use 20
npm run test

# キャッシュクリア
npm run test -- --clearCache
```

#### Playwright実行時のエラー
```bash
# ブラウザの再インストール
npx playwright install

# 権限エラーの場合（Linux）
npx playwright install-deps
```

#### TypeScript エラー
```bash
# 型定義の更新
npm install --save-dev @types/jest@latest

# tsconfig.json の確認
npx tsc --noEmit
```

## パフォーマンス最適化

### テスト実行速度の改善
1. **並列実行**: Jest の `--maxWorkers` オプション
2. **テスト分割**: describe ブロックの適切な使用
3. **モック活用**: 重い処理のモック化
4. **セレクティブテスト**: 変更部分のみテスト

### リソース使用量の最適化
1. **メモリ使用量**: `--logHeapUsage` で監視
2. **CPU使用量**: ワーカー数の調整
3. **ディスク容量**: テスト成果物の定期削除

## 次のステップ

1. ✅ 基本的なテスト環境構築完了
2. ✅ サンプルテストケース作成完了
3. ✅ CI/CD パイプライン設定完了
4. 🔄 全コンポーネントのテストケース作成
5. 🔄 E2Eテストケースの拡充
6. 🔄 Visual Regression Testing の導入
7. 🔄 Performance Testing の追加

これでテスト自動化環境が整い、品質の高い開発を継続できます。