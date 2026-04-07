import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * CheckoutPage class handles interactions with the checkout pages
 */
export class CheckoutPage extends BasePage {
  // Selectors for Cart page
  private readonly cartPageTitle: Locator;
  private readonly cartItems: Locator;
  private readonly checkoutButton: Locator;
  private readonly continueShoppingButton: Locator;
  private readonly removeButton: Locator;
  private readonly itemTotal: Locator;
  private readonly tax: Locator;
  private readonly total: Locator;

  // Selectors for Checkout: Information page
  private readonly checkoutInfoTitle: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly errorMessage: Locator;

  // Selectors for Checkout: Overview page
  private readonly checkoutOverviewTitle: Locator;
  private readonly finishButton: Locator;
  private readonly itemTotalOverview: Locator;
  private readonly taxOverview: Locator;
  private readonly totalOverview: Locator;

  // Selectors for Completion page
  private readonly completionTitle: Locator;
  private readonly completionMessage: Locator;
  private readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    // Cart page selectors
    this.cartPageTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
    this.continueShoppingButton = page.locator('#continue-shopping');
    this.removeButton = page.locator('.cart_button');
    this.itemTotal = page.locator('.summary_subtotal .summary_amount');
    this.tax = page.locator('.summary_tax .summary_amount');
    this.total = page.locator('.summary_total .summary_total_label');

    // Checkout Info page selectors
    this.checkoutInfoTitle = page.locator('.title');
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.errorMessage = page.locator('h3[data-value="Error: First Name is required"]');

    // Checkout Overview page selectors
    this.checkoutOverviewTitle = page.locator('.title');
    this.finishButton = page.locator('#finish');
    this.itemTotalOverview = page.locator('.summary_subtotal .summary_amount');
    this.taxOverview = page.locator('.summary_tax .summary_amount');
    this.totalOverview = page.locator('.summary_total .summary_total_label');

    // Completion page selectors
    this.completionTitle = page.locator('.title');
    this.completionMessage = page.locator('.subheader');
    this.backHomeButton = page.locator('#back-to-products');
  }

  // ========== Cart Page Methods ==========

  /**
   * Check if on cart page
   */
  async isCartPage(): Promise<boolean> {
    return await this.cartPageTitle.isVisible();
  }

  /**
   * Get cart page title
   */
  async getCartPageTitle(): Promise<string> {
    return await this.getElementText(this.cartPageTitle);
  }

  /**
   * Get number of items in cart
   */
  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  /**
   * Click checkout button to proceed to checkout
   */
  async clickCheckout(): Promise<void> {
    await this.click(this.checkoutButton);
    await this.waitForPageLoad();
  }

  /**
   * Click continue shopping button
   */
  async clickContinueShopping(): Promise<void> {
    await this.click(this.continueShoppingButton);
    await this.waitForPageLoad();
  }

  /**
   * Remove item from cart
   */
  async removeItemFromCart(): Promise<void> {
    await this.click(this.removeButton);
    await this.waitForPageLoad();
  }

  /**
   * Get item total from cart
   */
  async getItemTotal(): Promise<string> {
    return await this.getElementText(this.itemTotal);
  }

  /**
   * Get tax from cart
   */
  async getTax(): Promise<string> {
    return await this.getElementText(this.tax);
  }

  /**
   * Get total from cart
   */
  async getTotal(): Promise<string> {
    return await this.getElementText(this.total);
  }

  // ========== Checkout Information Page Methods ==========

  /**
   * Check if on checkout information page
   */
  async isCheckoutInfoPage(): Promise<boolean> {
    return await this.checkoutInfoTitle.isVisible();
  }

  /**
   * Get checkout info page title
   */
  async getCheckoutInfoTitle(): Promise<string> {
    return await this.getElementText(this.checkoutInfoTitle);
  }

  /**
   * Enter first name
   */
  async enterFirstName(firstName: string): Promise<void> {
    await this.fill(this.firstNameInput, firstName);
  }

  /**
   * Enter last name
   */
  async enterLastName(lastName: string): Promise<void> {
    await this.fill(this.lastNameInput, lastName);
  }

  /**
   * Enter postal code
   */
  async enterPostalCode(postalCode: string): Promise<void> {
    await this.fill(this.postalCodeInput, postalCode);
  }

  /**
   * Fill all checkout information
   */
  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.enterFirstName(firstName);
    await this.enterLastName(lastName);
    await this.enterPostalCode(postalCode);
  }

  /**
   * Click continue button on checkout info page
   */
  async clickContinue(): Promise<void> {
    await this.click(this.continueButton);
    await this.waitForPageLoad();
  }

  /**
   * Get error message if any
   */
  async getErrorMessage(): Promise<string> {
    if (await this.isElementVisible(this.errorMessage)) {
      return await this.getElementText(this.errorMessage);
    }
    return '';
  }

  // ========== Checkout Overview Page Methods ==========

  /**
   * Check if on checkout overview page
   */
  async isCheckoutOverviewPage(): Promise<boolean> {
    return await this.checkoutOverviewTitle.isVisible();
  }

  /**
   * Get checkout overview page title
   */
  async getCheckoutOverviewTitle(): Promise<string> {
    return await this.getElementText(this.checkoutOverviewTitle);
  }

  /**
   * Click finish button to complete checkout
   */
  async clickFinish(): Promise<void> {
    await this.click(this.finishButton);
    await this.waitForPageLoad();
  }

  /**
   * Get item total from overview
   */
  async getItemTotalOverview(): Promise<string> {
    return await this.getElementText(this.itemTotalOverview);
  }

  /**
   * Get tax from overview
   */
  async getTaxOverview(): Promise<string> {
    return await this.getElementText(this.taxOverview);
  }

  /**
   * Get total from overview
   */
  async getTotalOverview(): Promise<string> {
    return await this.getElementText(this.totalOverview);
  }

  // ========== Completion Page Methods ==========

  /**
   * Check if on completion page
   */
  async isCompletionPage(): Promise<boolean> {
    return await this.completionTitle.isVisible();
  }

  /**
   * Get completion page title
   */
  async getCompletionTitle(): Promise<string> {
    return await this.getElementText(this.completionTitle);
  }

  /**
   * Get completion message
   */
  async getCompletionMessage(): Promise<string> {
    return await this.getElementText(this.completionMessage);
  }

  /**
   * Click back home button to return to products
   */
  async clickBackHome(): Promise<void> {
    await this.click(this.backHomeButton);
    await this.waitForPageLoad();
  }
}