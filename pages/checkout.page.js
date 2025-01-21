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

  async completeCheckoutProcess(user, bool) {
    await this.completeCheckoutForm(user);
    // await this.checkSameAddressCheckbox();
    await this.toggleSameAddressCheckbox(bool);
    await this.submitButton.click();
  }

  async completeCheckoutForm(user) {
    const helpers = new Helpers(this.page);
    await this.fullNameInput.fill(user.personalInfo.fullName);
    await this.emailInput.fill(user.personalInfo.email);
    await this.addressInput.fill(user.personalInfo.address);
    await this.cityInput.fill(user.personalInfo.city);
    await this.stateInput.fill(user.personalInfo.state);
    await this.zipInput.fill(user.personalInfo.zip);
    await this.cardNameInput.fill(user.personalInfo.fullName);
    await this.cardNumberInput.fill(user.paymentData.ccNumber);
    await this.expYearInput.fill(user.paymentData.expYear);
    helpers.selectOptionFromDropdown(
      this.expMonthDropdown,
      user.paymentData.expMonth
    );
    await this.cvvInput.fill(user.paymentData.cvv);
  }

  async toggleSameAddressCheckbox(shouldCheck) {
    const isChecked = await this.shippingSameBillingCheckbox.isChecked();
    if (shouldCheck && !isChecked) {
      await this.shippingSameBillingCheckbox.check();
    } else if (!shouldCheck && isChecked) {
      await this.shippingSameBillingCheckbox.uncheck();
    }
  }

  async getAllPricesFromCart() {
    const prices = [];
    for (let i = 0; i < (await this.cartPrices.count()); i++) {
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
