import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to concept page', async ({ page }) => {
    await page.click('text=私たちの想いを知る');
    await expect(page).toHaveURL('/concept');
    await expect(page.locator('h1')).toContainText('あなたの物語が');
  });

  test('should navigate to service page', async ({ page }) => {
    await page.click('text=サービス詳細');
    await expect(page).toHaveURL('/service');
    await expect(page.locator('h1')).toContainText('サービス詳細');
  });

  test('should navigate to pricing page', async ({ page }) => {
    await page.goto('/pricing');
    await expect(page.locator('h1')).toContainText('料金プラン');
    
    // 料金プランが表示されることを確認
    await expect(page.locator('text=月額プラン')).toBeVisible();
    await expect(page.locator('text=3ヶ月プラン')).toBeVisible();
    await expect(page.locator('text=6ヶ月プラン')).toBeVisible();
    await expect(page.locator('text=年額プラン')).toBeVisible();
  });

  test('should navigate to login page', async ({ page }) => {
    await page.click('text=ログイン');
    await expect(page).toHaveURL('/auth/login');
    await expect(page.locator('h2')).toContainText('ログイン');
  });

  test('should navigate to register page', async ({ page }) => {
    await page.click('text=無料で始める');
    await expect(page).toHaveURL('/auth/register');
    await expect(page.locator('h2')).toContainText('新規登録');
  });
});

test.describe('Responsive Navigation', () => {
  test('mobile navigation works correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // モバイルメニューボタンをクリック
    const menuButton = page.locator('[aria-label="メニューを開く"]');
    if (await menuButton.isVisible()) {
      await menuButton.click();
      
      // モバイルメニューが表示されることを確認
      await expect(page.locator('text=私たちの想い')).toBeVisible();
      await expect(page.locator('text=サービス詳細')).toBeVisible();
      await expect(page.locator('text=料金プラン')).toBeVisible();
    }
  });
});