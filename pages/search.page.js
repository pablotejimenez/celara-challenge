const configuration = require('../configuration/configuration');
const { Helpers } = require('../utils/helpers');

exports.SearchPage = class SearchPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  static url = configuration.urls.searchPage;

  constructor(page) {
    this.page = page;
  }

  async goToUrl() {
    await this.page.goto(SearchPage.url);
  }

  get searchInput() {
    return this.page.locator('input[name="searchWord"]');
  }

  get searchSubmitBtn() {
    return this.page.locator('button[type="submit"]');
  }

  get searchResult() {
    return this.page.locator('#result');
  }

  async performSearch(term = false) {
    if (term) {
      await this.searchInput.fill(term);
    }
    await this.searchSubmitBtn.click();
    await this.waitForSearchToFinish();
  }

  async waitForSearchToFinish() {
    const helpers = new Helpers(this.page);
    await helpers.waitForTextToDisappear(
      this.searchResult,
      configuration.searchPage.searching
    );
  }
};
