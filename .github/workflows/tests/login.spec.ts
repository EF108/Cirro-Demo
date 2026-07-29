import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {

  test('successful login with valid credentials', async ({ page }) => {
    await page.goto('https://your-app.com/login');

    await page.fill('#username', 'testuser');
    await page.fill('#password', 'Password123!');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/dashboard/);
    await expect(page.locator('text=Welcome')).toBeVisible();
  });

  test('login fails with invalid password', async ({ page }) => {
    await page.goto('https://your-app.com/login');

    await page.fill('#username', 'testuser');
    await page.fill('#password', 'WrongPassword');
    await page.click('button[type="submit"]');

    await expect(page.locator('.error-message'))
      .toHaveText('Invalid username or password');
  });

  test('required field validation', async ({ page }) => {
    await page.goto('https://your-app.com/login');

    await page.click('button[type="submit"]');

    await expect(page.locator('#username-error'))
      .toHaveText('Username is required');

    await expect(page.locator('#password-error'))
      .toHaveText('Password is required');
  });

  test('password is masked', async ({ page }) => {
    await page.goto('https://your-app.com/login');

    await expect(page.locator('#password'))
      .toHaveAttribute('type', 'password');
  });

  test('user can logout', async ({ page }) => {
    await page.goto('https://your-app.com/login');

    await page.fill('#username', 'testuser');
    await page.fill('#password', 'Password123!');
    await page.click('button[type="submit"]');

    await page.click('#logout');

    await expect(page).toHaveURL(/login/);
  });
});
