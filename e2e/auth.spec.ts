import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('login page displays correctly', async ({ page }) => {
    await page.goto('/auth/login');
    
    // ページタイトル確認
    await expect(page.locator('h2')).toContainText('ログイン');
    
    // メールアドレス入力フィールド確認
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('label')).toContainText('メールアドレス');
    
    // 認証コード送信ボタン確認
    await expect(page.locator('button:has-text("認証コードを送信")')).toBeVisible();
    
    // ソーシャルログインボタン確認
    await expect(page.locator('button:has-text("LINEでログイン")')).toBeVisible();
    await expect(page.locator('button:has-text("Googleでログイン")')).toBeVisible();
    await expect(page.locator('button:has-text("Facebookでログイン")')).toBeVisible();
    
    // 新規登録リンク確認
    await expect(page.locator('text=新規登録')).toBeVisible();
  });

  test('register page displays correctly', async ({ page }) => {
    await page.goto('/auth/register');
    
    // ページタイトル確認
    await expect(page.locator('h2')).toContainText('新規登録');
    
    // メールアドレス入力フィールド確認
    await expect(page.locator('input[type="email"]')).toBeVisible();
    
    // 利用規約チェックボックス確認
    await expect(page.locator('input[type="checkbox"]')).toBeVisible();
    await expect(page.locator('text=利用規約')).toBeVisible();
    await expect(page.locator('text=プライバシーポリシー')).toBeVisible();
    
    // 認証コード送信ボタン確認（初期状態では無効）
    const submitButton = page.locator('button:has-text("認証コードを送信")');
    await expect(submitButton).toBeDisabled();
    
    // ソーシャル登録ボタン確認（初期状態では無効）
    await expect(page.locator('button:has-text("LINEで登録")')).toBeDisabled();
    await expect(page.locator('button:has-text("Googleで登録")')).toBeDisabled();
    await expect(page.locator('button:has-text("Facebookで登録")')).toBeDisabled();
    
    // ログインリンク確認
    await expect(page.locator('text=ログイン')).toBeVisible();
  });

  test('register form validation works', async ({ page }) => {
    await page.goto('/auth/register');
    
    // メールアドレス入力
    await page.fill('input[type="email"]', 'test@example.com');
    
    // 利用規約チェックボックスをチェック
    await page.check('input[type="checkbox"]');
    
    // ボタンが有効になることを確認
    await expect(page.locator('button:has-text("認証コードを送信")')).toBeEnabled();
    await expect(page.locator('button:has-text("LINEで登録")')).toBeEnabled();
    await expect(page.locator('button:has-text("Googleで登録")')).toBeEnabled();
    await expect(page.locator('button:has-text("Facebookで登録")')).toBeEnabled();
  });

  test('navigation between login and register works', async ({ page }) => {
    // ログインページから新規登録へ
    await page.goto('/auth/login');
    await page.click('text=新規登録');
    await expect(page).toHaveURL('/auth/register');
    
    // 新規登録ページからログインへ
    await page.click('text=ログイン');
    await expect(page).toHaveURL('/auth/login');
  });

  test('LINE authentication button is prominently displayed', async ({ page }) => {
    await page.goto('/auth/login');
    
    // LINEボタンが緑色で目立つ位置にあることを確認
    const lineButton = page.locator('button:has-text("LINEでログイン")');
    await expect(lineButton).toBeVisible();
    
    // LINEボタンが他のソーシャルログインボタンより上に配置されているか確認
    const googleButton = page.locator('button:has-text("Googleでログイン")');
    const lineBox = await lineButton.boundingBox();
    const googleBox = await googleButton.boundingBox();
    
    if (lineBox && googleBox) {
      expect(lineBox.y).toBeLessThan(googleBox.y);
    }
  });
});