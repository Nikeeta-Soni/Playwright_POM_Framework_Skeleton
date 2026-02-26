// @ts-check
import { test, expect } from '@playwright/test';
import { PlaywrightPage } from '../pages/PlaywrightPage.js';

/**
 * Example test suite using the Page Object Model (POM).
 *
 * Pattern:
 *   1. Instantiate the page object inside the test (or in beforeEach).
 *   2. Use page object methods for navigation and actions.
 *   3. Use page object locators for assertions — keep expect() in the test.
 */
test.describe('Playwright homepage', () => {
  test('has title', async ({ page }) => {
    const playwrightPage = new PlaywrightPage(page);

    await playwrightPage.goto();

    await expect(page).toHaveTitle(/Playwright/);
  });

  test('get started link navigates to installation', async ({ page }) => {
    const playwrightPage = new PlaywrightPage(page);

    await playwrightPage.goto();
    await playwrightPage.clickGetStarted();

    await expect(playwrightPage.installationHeading).toBeVisible();
  });
});
