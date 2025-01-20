exports.Helpers = class Helpers {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page;
  }

  async selectOptionFromDropdown(dropdown, option) {
    await dropdown.selectOption(option);
  }

  async waitForTextToDisappear(locator, text, timeout = 15000) {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      const content = await locator.textContent();
      if (!content.includes(text)) {
        return true;
      }
      await this.page.waitForTimeout(500);
    }

    throw new Error(`Text "${text}" did not disappear within ${timeout}ms`);
  }

  async waitForDialog(maxRetries, timeout) {
    while (maxRetries > 0) {
      try {
        return await this.page.waitForEvent('dialog', { timeout });
      } catch (error) {
        if (maxRetries === 0) throw error;
      }
    }
  }

  async dismissDialog() {
    this.page.on('dialog', dialog => dialog.dismiss());
  }
};
