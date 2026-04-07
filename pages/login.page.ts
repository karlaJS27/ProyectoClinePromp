import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * LoginPage class handles interactions with the login page
 */
export class LoginPage extends BasePage {
  // Selectors - made public for test access
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  private readonly errorMessage: Locator;
  private readonly pageTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('h3[data-value="Credentials accepted, but access is restricted. Please try again."]');
    this.pageTitle = page.locator('.title');
  }

  /**
   * Navigate to the login page
   */
  async goto(): Promise<void> {
    await this.navigateTo('');
    // Wait for the login form to be fully loaded
    await this.usernameInput.waitFor({ state: 'visible', timeout: 30000 });
  }

  /**
   * Enter username in the username field
   */
  async enterUsername(username: string): Promise<void> {
    await this.fill(this.usernameInput, username);
  }

  /**
   * Enter password in the password field
   */
  async enterPassword(password: string): Promise<void> {
    await this.fill(this.passwordInput, password);
  }

  /**
   * Click the login button
   */
  async clickLoginButton(): Promise<void> {
    await this.click(this.loginButton);
    await this.waitForPageLoad();
  }

  /**
   * Perform a complete login with credentials
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Get the error message if displayed
   */
  async getErrorMessage(): Promise<string> {
    if (await this.isElementVisible(this.errorMessage)) {
      return await this.getElementText(this.errorMessage);
    }
    return '';
  }

  /**
   * Check if login was successful by verifying redirect to products page
   */
  async isLoginSuccessful(): Promise<boolean> {
    // After successful login, user is redirected to inventory page
    // which has a product title or inventory container
    const inventoryContainer = this.page.locator('.inventory_list');
    return await inventoryContainer.isVisible();
  }

  /**
   * Get the page title text
   */
  async getPageTitleText(): Promise<string> {
    return await this.getElementText(this.pageTitle);
  }
}