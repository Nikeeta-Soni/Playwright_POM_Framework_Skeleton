// @ts-check

/**
 * BasePage
 * --------
 * All page objects extend this class.
 * Place shared/common browser interactions here (navigation, waits, etc.)
 * Do NOT put page-specific selectors or actions here.
 */
export class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a URL.
   * @param {string} url
   */
  async navigate(url) {
    await this.page.goto(url);
  }

  /**
   * Returns the current page title.
   * @returns {Promise<string>}
   */
  async getTitle() {
    return this.page.title();
  }

  /**
   * Waits for the page to reach 'load' state.
   */
  async waitForLoad() {
    await this.page.waitForLoadState('load');
  }
}
