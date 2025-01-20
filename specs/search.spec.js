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
  const searchingInProgress = configuration.searchPage.searching;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    searchPage = new SearchPage(page);
    helpers = new Helpers(page);
    await loginPage.goToUrl();
    await loginPage.login(username, password);
    await homePage.welcomeMessage.waitFor();
    await searchPage.goToUrl();
  });

  test('SRCH-01 | verify search engine returns one result', async () => {
    const searchTerm = configuration.products.superPepperoniTitle;
    const resultFoundPrefix = configuration.searchPage.oneResultPrefix;
    await searchPage.performSearch(searchTerm);
    await helpers.waitForTextToDisappear(
      searchPage.searchResult,
      searchingInProgress
    );
    expect(await searchPage.searchResult).toBeVisible();
    expect(await searchPage.searchResult.textContent()).toEqual(
      resultFoundPrefix + searchTerm
    );
  });

  test('SRCH-02 | verify empty search displays an alert', async () => {
    const provideSearchWordMsg = configuration.searchPage.provideSearchWordMsg;
    await searchPage.performSearch();
    await helpers.waitForTextToDisappear(
      searchPage.searchResult,
      searchingInProgress
    );
    expect(await searchPage.searchResult).toBeVisible();
    expect(await searchPage.searchResult.textContent()).toEqual(
      provideSearchWordMsg
    );
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
