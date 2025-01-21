const config = {};

config.loginPage = {
  wrongCredentials: 'Wrong credentials',
  emptyFields: 'Fields can not be empty'
};

config.urls = {
  loginPage: '/login',
  homePage: '/home',
  checkoutPage: '/checkout',
  gridPage: '/grid',
  searchPage: '/search'
};

config.testUser = {
  userName: process.env.TEST_USER_USERNAME,
  password: process.env.TEST_USER_PASSWORD,
  personalInfo: {
    fullName: 'John Doe',
    email: 'johndoe19@gmail.com',
    address: '8609 Westwood Center',
    city: 'Tysons Corner',
    state: 'Virginia',
    zip: '22182'
  },
  paymentData: {
    ccNumber: '4111111111111111',
    expMonth: 'March',
    expYear: '2030',
    cvv: '123'
  }
};

config.invalidTestUser = {
  userName: 'wrongUsername',
  password: 'wrongPassword'
};

config.dialogs = {
  alertType: 'alert',
  sameAddressMustBeSelectedMsg:
    'Shipping address same as billing checkbox must be selected.'
};

config.products = {
  superPepperoniTitle: 'Super Pepperoni',
  superPepperoniPrice: '$10'
};

config.searchPage = {
  oneResultPrefix: 'Found one result for ',
  provideSearchWordMsg: 'Please provide a search word.',
  searching: 'searching..'
};

module.exports = config;
