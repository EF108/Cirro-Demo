```javascript
const { test, expect } = require('@playwright/test');

test.describe('Login Flow Automation Tests', () => {
  let page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });
  });

  test.afterEach(async () => {
    await page?.close();
  });

