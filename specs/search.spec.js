const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');
const { HomePage } = require('../pages/home.page');
const { SearchPage } = require('../pages/search.page');
const { Helpers } = require('../utils/helpers');
const configuration = require('../configuration/configuration');

test.describe('Search Functionality Tests', () => {
  let loginPage;
  let searchPage;
  let helpers;
  let homePage;
  const username = configuration.testUser.userName;
  const password = configuration.testUser.password;
  const searchTerm = configuration.products.superPepperoniTitle;
  const resultFoundPrefix = configuration.searchPage.oneResultPrefix;
  const provideSearchWordMsg = configuration.searchPage.provideSearchWordMsg;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    searchPage = new SearchPage(page);
    helpers = new Helpers(page);
    await loginPage.goToUrl();
    await loginPage.login(username, password);
    await searchPage.goToUrl();
  });

  test('SRCH-01 | Verify search engine returns one result', async () => {
    await searchPage.performSearch(searchTerm);
    expect(await searchPage.searchResult).toBeVisible();
    expect(await searchPage.searchResult.textContent()).toEqual(
      resultFoundPrefix + searchTerm
    );
  });

  test('SRCH-02 | Verify empty search displays an alert', async () => {
    await searchPage.performSearch();
    expect(await searchPage.searchResult).toBeVisible();
    expect(await searchPage.searchResult.textContent()).toEqual(
      provideSearchWordMsg
    );
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
