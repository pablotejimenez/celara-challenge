const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');
const { HomePage } = require('../pages/home.page');
const configuration = require('../configuration/configuration.js');

test.describe('Login Functionality Tests', () => {
  let loginPage;
  let homePage;
  const username = configuration.testUser.userName;
  const password = configuration.testUser.password;
  const invalidUsername = 'wrongUsername';
  const invalidPassword = 'wrongPassword';
  const emptyString = '';

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await loginPage.goToUrl();
  });

  test('LOG-01 | verify user logs in sucessfully and lands on the homepage', async () => {
    await loginPage.login(username, password);
    await expect(homePage.welcomeMessage).toBeVisible();
    await expect(homePage.welcomeMessageUsername).toHaveText(username);
  });

  test('LOG-02a | verify user fails to login with invalid username and proper alert displays', async () => {
    await loginPage.login(invalidUsername, password);
    await expect(loginPage.message, 'alert is not visible').toBeVisible();
    const displayedText = await loginPage.message.textContent();
    await expect(
      loginPage.message,
      `alert text is: "${displayedText}" and was expecting: "${configuration.loginPage.wrongCredentials}"`
    ).toHaveText(configuration.loginPage.wrongCredentials);
  });

  test('LOG-02b | verify user fails to login with invalid password and proper alert displays', async () => {
    await loginPage.login(username, invalidPassword);
    await expect(loginPage.message).toBeVisible();
    const displayedText = await loginPage.message.textContent();
    await expect(
      loginPage.message,
      `alert text is: "${displayedText}" and was expecting: "${configuration.loginPage.wrongCredentials}"`
    ).toHaveText(configuration.loginPage.wrongCredentials);
  });

  test('LOG-03 | verify user fails to login with empty fields and proper alert displays', async () => {
    await loginPage.login(emptyString, emptyString);
    await expect(loginPage.message).toBeVisible();
    await expect(loginPage.message).toHaveText(
      configuration.loginPage.emptyFields
    );
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
