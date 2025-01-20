const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');
const { HomePage } = require('../pages/home.page');
const { GridPage } = require('../pages/grid.page');
const { Helpers } = require('../utils/helpers');
const configuration = require('../configuration/configuration');

test.describe('Product Grid Tests', () => {
  let loginPage;
  let gridPage;
  let helpers;
  let homePage;
  const username = configuration.testUser.userName;
  const password = configuration.testUser.password;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    gridPage = new GridPage(page);
    helpers = new Helpers(page);
    await loginPage.goToUrl();
    await loginPage.login(username, password);
    await homePage.welcomeMessage.waitFor();
    await gridPage.goToUrl();
  });

  test('GRID-01 | verify 7th product title and price', async () => {
    const [title, price] = await gridPage.getProductInfoByPosition(6);
    const expectedTitle = configuration.products.superPepperoniTitle;
    const expectedPrice = configuration.products.superPepperoniPrice;
    expect(expectedTitle).toEqual(title);
    expect(expectedPrice).toEqual(price);
  });

  test('GRID-02 | verify all products have title, price, image and add button', async () => {
    const itemsCount = await gridPage.itemsInGrid.count();

    for (let i = 0; i < itemsCount; i++) {
      const item = await gridPage.itemsInGrid.nth(i);
      const [title, price, imageSrc] = await gridPage.getProductInfoByPosition(
        i
      );
      const addToOrderBtn = await item.locator(gridPage.addToOrderBtn);
      expect(title.trim().length).toBeGreaterThan(0);
      expect(price.trim().length).toBeGreaterThan(0);
      expect(imageSrc.trim().length).toBeGreaterThan(0);
      expect(await addToOrderBtn.isVisible()).toBe(true);
    }
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
