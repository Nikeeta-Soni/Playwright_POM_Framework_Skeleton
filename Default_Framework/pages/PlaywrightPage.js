// @ts-check
import { BasePage } from './BasePage.js';

const URL = 'https://playwright.dev/';

/**
 * PlaywrightPage
 * --------------
 * Page Object for https://playwright.dev/
 * Demonstrates the POM pattern:
 *   - Locators defined as getters (lazy, re-queried on each access)
 *   - Actions as async methods
 *   - No assertions here — keep assertions in the test file
 */
export class PlaywrightPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
  }

  // ─── Navigation ────────────────────────────────────────────────────────────

  async goto() {
    await this.navigate(URL);
  }

  // ─── Locators ──────────────────────────────────────────────────────────────
  // Use getters so locators are evaluated lazily (not at construction time).

  get getStartedLink() {
    return this.page.getByRole('link', { name: 'Get started' });
  }

  get installationHeading() {
    return this.page.getByRole('heading', { name: 'Installation' });
  }

  // ─── Actions ───────────────────────────────────────────────────────────────

  async clickGetStarted() {
    await this.getStartedLink.click();
  }
}
