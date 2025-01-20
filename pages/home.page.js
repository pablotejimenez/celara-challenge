const configuration = require('../configuration/configuration');

exports.HomePage = class HomePage {
  static url = configuration.urls.homePage;
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page;
  }

  async goToUrl() {
    await this.page.goto(HomePage.url);
  }

  get welcomeMessage() {
    return this.page.locator('#welcome-message');
  }

  get welcomeMessageUsername() {
    return this.page.locator('[data-id="username"]');
  }
};
