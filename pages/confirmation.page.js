export class OrderConfirmationPage {
  constructor(page) {
    this.page = page;
  }

  get orderNumber() {
    return this.page.locator('[data-id="ordernumber"]');
  }
}
