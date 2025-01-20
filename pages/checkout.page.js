const configuration = require('../configuration/configuration');
const { Helpers } = require('../utils/helpers');

exports.CheckoutPage = class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  static url = configuration.urls.checkoutPage;

  constructor(page) {
    this.page = page;
  }

  async goToUrl() {
    await this.page.goto(CheckoutPage.url);
  }

  get fullNameInput() {
    return this.page.locator('#fname');
  }

  get emailInput() {
    return this.page.locator('#email');
  }

  get addressInput() {
    return this.page.locator('#adr');
  }

  get cityInput() {
    return this.page.locator('#city');
  }

  get stateInput() {
    return this.page.locator('#state');
  }

  get zipInput() {
    return this.page.locator('#zip');
  }

  get cardNameInput() {
    return this.page.locator('#cname');
  }

  get cardNumberInput() {
    return this.page.locator('#ccnum');
  }

  get expMonthDropdown() {
    return this.page.locator('#expmonth');
  }

  get expYearInput() {
    return this.page.locator('#expyear');
  }

  get cvvInput() {
    return this.page.locator('#cvv');
  }

  get shippingSameBillingCheckbox() {
    return this.page.locator('input[name="sameadr"]');
  }

  get submitButton() {
    return this.page.locator('button[class="btn"]');
  }

  get cartPrices() {
    return this.page.locator('.price', { hasText: '$' });
  }

  async completeCheckoutForm(user) {
    const helpers = new Helpers(this.page);
    await this.fullNameInput.fill(user.fullName);
    await this.emailInput.fill(user.email);
    await this.addressInput.fill(user.address);
    await this.cityInput.fill(user.city);
    await this.stateInput.fill(user.state);
    await this.zipInput.fill(user.zip);
    await this.cardNameInput.fill(user.fullName);
    await this.cardNumberInput.fill(user.ccNumber);
    await this.expYearInput.fill(user.expYear);
    helpers.selectOptionFromDropdown(this.expMonthDropdown, user.expMonth);
    await this.cvvInput.fill(user.cvv);
  }

  async checkSameAddressCheckbox() {
    const isChecked = await this.shippingSameBillingCheckbox.isChecked();
    if (!isChecked) {
      await this.shippingSameBillingCheckbox.check();
    }
  }

  async uncheckSameAddressCheckbox() {
    const isChecked = await this.shippingSameBillingCheckbox.isChecked();
    if (isChecked) {
      await this.shippingSameBillingCheckbox.uncheck();
    }
  }

  async acceptSameAddressAlert(expectedType, expectedMessage) {
    let alertIsGone = false;
    const dialog = await this.page.waitForEvent('dialog');
    if (
      dialog.type() === expectedType &&
      dialog.message() === expectedMessage
    ) {
      await dialog.accept();
      const helpers = new Helpers(this.page);
      await helpers.dismissDialog();
      return (alertIsGone = true);
    } else {
      throw new Error('Unexpected dialog type or message.');
    }
  }

  async getAllPricesFromCart() {
    const count = await this.cartPrices.count();
    const prices = [];
    for (let i = 0; i < count; i++) {
      const priceText = await this.cartPrices.nth(i).textContent();
      prices.push(parseFloat(priceText.replace('$', '').trim()));
    }
    return prices;
  }

  async getTotalPriceFromCart() {
    const cartPrices = await this.getAllPricesFromCart();
    return cartPrices.pop();
  }

  async sumPricesFromCartProducts() {
    const cartPrices = await this.getAllPricesFromCart();
    cartPrices.pop();
    const sumOfProducts = cartPrices.reduce((sum, price) => sum + price, 0);
    return sumOfProducts;
  }
};
