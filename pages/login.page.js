const configuration = require('../configuration/configuration');

exports.LoginPage = class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  static url = configuration.urls.loginPage;

  constructor(page) {
    this.page = page;
  }

  async goToUrl() {
    await this.page.goto(LoginPage.url);
  }

  get userInput() {
    return this.page.locator('#username');
  }

  get passInput() {
    return this.page.locator('#password');
  }

  get submitBtn() {
    return this.page.locator('#signin-button');
  }

  get message() {
    return this.page.locator('#message');
  }

  async login(username, password) {
    await this.userInput.fill(username);
    await this.passInput.fill(password);
    await this.submitBtn.click();
  }
};
