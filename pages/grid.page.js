const configuration = require('../configuration/configuration');

exports.GridPage = class GridPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  static url = configuration.urls.gridPage;

  constructor(page) {
    this.page = page;
  }

  async goToUrl() {
    await this.page.goto(GridPage.url);
  }

  get itemsInGrid() {
    return this.page.locator('.item');
  }

  get itemName() {
    return '[data-test-id="item-name"]';
  }

  get itemPrice() {
    return '#item-price';
  }

  get itemImage() {
    return 'img';
  }

  get addToOrderBtn() {
    return '[data-test-id=add-to-order]';
  }

  get addToOrderBtnLocator2() {
    return this.page.locator('[data-test-id=add-to-order]');
  }

  async getProductInfoByPosition(position) {
    const selectedItem = this.itemsInGrid.nth(position);
    const title = await selectedItem.locator(this.itemName).innerText();
    const price = await selectedItem.locator(this.itemPrice).innerText();
    const imageSrc = await selectedItem
      .locator(this.itemImage)
      .getAttribute('src');
    return [title, price, imageSrc];
  }
};
