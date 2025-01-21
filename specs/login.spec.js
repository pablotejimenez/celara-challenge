const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');
const { HomePage } = require('../pages/home.page');
const configuration = require('../configuration/configuration.js');

test.describe('Login Functionality Tests', () => {
  let loginPage;
  let homePage;
  const username = configuration.testUser.userName;
  const password = configuration.testUser.password;
  const invalidUsername = configuration.invalidTestUser.userName;
  const invalidPassword = configuration.invalidTestUser.password;
  const emptyString = '';

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await loginPage.goToUrl();
  });

  test('LOG-01 | Verify user logs in sucessfully and lands on the homepage', async () => {
    await loginPage.login(username, password);
    await expect(homePage.welcomeMessage).toBeVisible();
    await expect(homePage.welcomeMessageUsername).toHaveText(username);
  });

  test('LOG-02a | Verify user fails to login with invalid username and proper alert displays', async () => {
    await loginPage.login(invalidUsername, password, true);
    await expect(loginPage.message, 'alert is not visible').toBeVisible();
    const messageText = await loginPage.message.textContent();
    await expect(
      loginPage.message,
      `alert text is: "${messageText}" and was expecting: "${configuration.loginPage.wrongCredentials}"`
    ).toHaveText(configuration.loginPage.wrongCredentials);
  });

  test('LOG-02b | Verify user fails to login with invalid password and proper alert displays', async () => {
    await loginPage.login(username, invalidPassword, true);
    await expect(loginPage.message).toBeVisible();
    const messageText = await loginPage.message.textContent();
    await expect(
      loginPage.message,
      `alert text is: "${messageText}" and was expecting: "${configuration.loginPage.wrongCredentials}"`
    ).toHaveText(configuration.loginPage.wrongCredentials);
  });

  test('LOG-03 | Verify user fails to login with empty fields and proper alert displays', async () => {
    await loginPage.login(emptyString, emptyString, true);
    await expect(loginPage.message).toBeVisible();
    const messageText = await loginPage.message.textContent();
    await expect(
      loginPage.message,
      `alert text is: "${messageText}" and was expecting: "${configuration.loginPage.wrongCredentials}"`
    ).toHaveText(configuration.loginPage.emptyFields);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
