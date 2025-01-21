const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');
const { HomePage } = require('../pages/home.page');
const { CheckoutPage } = require('../pages/checkout.page');
const { OrderConfirmationPage } = require('../pages/confirmation.page');
const { Helpers } = require('../utils/helpers');
const configuration = require('../configuration/configuration');

test.describe('Checkout Flow Tests', () => {
  let loginPage;
  let checkoutPage;
  let orderConfirmationPage;
  let helpers;
  let homePage;
  const username = configuration.testUser.userName;
  const password = configuration.testUser.password;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    checkoutPage = new CheckoutPage(page);
    orderConfirmationPage = new OrderConfirmationPage(page);
    helpers = new Helpers(page);
    await loginPage.goToUrl();
    await loginPage.login(username, password);
    // await homePage.welcomeMessage.waitFor();
    await checkoutPage.goToUrl();
  });

  test('CO-01 | Verify user can successfully place an order', async () => {
    await checkoutPage.completeCheckoutProcess(configuration.testUser, true);
    await expect(orderConfirmationPage.orderNumber).not.toBeEmpty();
  });

  test('CO-02 | Verify user cannot continue without selecting the same address checkbox and alert handling', async () => {
    await checkoutPage.completeCheckoutProcess(configuration.testUser, false);
    const isAlertGone = await helpers.waitAndDismissDialog(
      configuration.dialogs.alertType,
      configuration.dialogs.sameAddressMustBeSelectedMsg,
      3,
      30000
    );
    expect(isAlertGone).toBe(true);
  });

  test('CO-03 | Verify cart total price is correct', async () => {
    const sumOfProducts = await checkoutPage.sumPricesFromCartProducts();
    const totalPrice = await checkoutPage.getTotalPriceFromCart();
    expect(totalPrice).toEqual(sumOfProducts);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
