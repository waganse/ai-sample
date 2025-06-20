import { test, expect } from '@playwright/test';

test.describe('Pricing Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pricing');
  });

  test('displays all pricing plans', async ({ page }) => {
    // ページタイトル確認
    await expect(page.locator('h1')).toContainText('料金プラン');
    
    // 4つの料金プラン確認
    await expect(page.locator('text=月額プラン')).toBeVisible();
    await expect(page.locator('text=3ヶ月プラン')).toBeVisible();
    await expect(page.locator('text=6ヶ月プラン')).toBeVisible();
    await expect(page.locator('text=年額プラン')).toBeVisible();
  });

  test('displays pricing information correctly', async ({ page }) => {
    // 月額プラン
    await expect(page.locator('text=¥980')).toBeVisible();
    
    // 3ヶ月プラン（おすすめマーク付き）
    await expect(page.locator('text=¥2,700')).toBeVisible();
    await expect(page.locator('text=おすすめ')).toBeVisible();
    await expect(page.locator('text=8% OFF')).toBeVisible();
    
    // 6ヶ月プラン
    await expect(page.locator('text=¥5,100')).toBeVisible();
    await expect(page.locator('text=13% OFF')).toBeVisible();
    
    // 年額プラン
    await expect(page.locator('text=¥10,000')).toBeVisible();
    await expect(page.locator('text=15% OFF')).toBeVisible();
  });

  test('displays monthly equivalent prices', async ({ page }) => {
    await expect(page.locator('text=月額換算: ¥980')).toBeVisible();
    await expect(page.locator('text=月額換算: ¥900')).toBeVisible();
    await expect(page.locator('text=月額換算: ¥850')).toBeVisible();
    await expect(page.locator('text=月額換算: ¥833')).toBeVisible();
  });

  test('single registration button is displayed', async ({ page }) => {
    // カード内にボタンがないことを確認
    const cardButtons = page.locator('.relative.p-6 button');
    await expect(cardButtons).toHaveCount(0);
    
    // セクション下部に1つの登録ボタンがあることを確認
    const registerButton = page.locator('text=無料登録で始める');
    await expect(registerButton).toBeVisible();
    await expect(registerButton).toHaveCount(1);
    
    // 説明テキスト確認
    await expect(page.locator('text=登録後、お好みのプランをお選びいただけます')).toBeVisible();
  });

  test('features section displays correctly', async ({ page }) => {
    await expect(page.locator('text=すべてのプランに含まれる機能')).toBeVisible();
    
    // 主要機能の確認
    await expect(page.locator('text=プロフィール閲覧無制限')).toBeVisible();
    await expect(page.locator('text=メッセージ送受信無制限')).toBeVisible();
    await expect(page.locator('text=コミュニティ参加')).toBeVisible();
    await expect(page.locator('text=イベント参加')).toBeVisible();
    await expect(page.locator('text=24時間サポート')).toBeVisible();
  });

  test('FAQ section displays correctly', async ({ page }) => {
    await expect(page.locator('text=よくある質問')).toBeVisible();
    
    // FAQ項目の確認
    await expect(page.locator('text=無料で利用できる機能はありますか？')).toBeVisible();
    await expect(page.locator('text=プランの変更は可能ですか？')).toBeVisible();
    await expect(page.locator('text=退会・解約はいつでも可能ですか？')).toBeVisible();
    await expect(page.locator('text=支払い方法は何が利用できますか？')).toBeVisible();
  });

  test('registration button click works', async ({ page }) => {
    await page.click('text=無料登録で始める');
    await expect(page).toHaveURL('/auth/register');
  });

  test('recommended plan is highlighted', async ({ page }) => {
    // おすすめプランのカードが強調表示されているか確認
    const recommendedCard = page.locator('.ring-2.ring-primary-500.scale-105');
    await expect(recommendedCard).toBeVisible();
    
    // おすすめバッジが表示されているか確認
    await expect(page.locator('text=おすすめ')).toBeVisible();
  });

  test('free features note is displayed', async ({ page }) => {
    await expect(page.locator('text=無料登録でプロフィール作成可能')).toBeVisible();
  });
});