import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * ProductsPage class handles interactions with the products/inventory page
 */
export class ProductsPage extends BasePage {
  // Selectors
  private readonly pageTitle: Locator;
  private readonly cartBadge: Locator;
  private readonly shoppingCartButton: Locator;
  private readonly productsContainer: Locator;
  private readonly sortDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartButton = page.locator('.shopping_cart_link');
    this.productsContainer = page.locator('.inventory_list');
    this.sortDropdown = page.locator('.product_sort_container');
  }

  /**
   * Check if the products page is loaded
   */
  async isProductsPageLoaded(): Promise<boolean> {
    return await this.productsContainer.isVisible();
  }

  /**
   * Get the page title text
   */
  async getPageTitleText(): Promise<string> {
    return await this.getElementText(this.pageTitle);
  }

  /**
   * Get the cart badge count (number of items in cart)
   */
  async getCartBadgeCount(): Promise<string> {
    if (await this.cartBadge.isVisible()) {
      return await this.cartBadge.textContent() || '0';
    }
    return '0';
  }

  /**
   * Check if cart badge is visible
   */
  async isCartBadgeVisible(): Promise<boolean> {
    return await this.cartBadge.isVisible();
  }

  /**
   * Add a product to cart by product name
   */
  async addProductToCart(productName: string): Promise<void> {
    const addButton = this.page.locator(`#add-to-cart-${productName.toLowerCase().replace(/\s+/g, '-')}`);
    await addButton.click();
    await this.waitForPageLoad();
  }

  /**
   * Remove a product from cart by product name
   */
  async removeProductFromCart(productName: string): Promise<void> {
    const removeButton = this.page.locator(`#remove-${productName.toLowerCase().replace(/\s+/g, '-')}`);
    await removeButton.click();
    await this.waitForPageLoad();
  }

  /**
   * Check if add button is visible for a product
   */
  async isAddButtonVisible(productName: string): Promise<boolean> {
    const addButton = this.page.locator(`#add-to-cart-${productName.toLowerCase().replace(/\s+/g, '-')}`);
    return await addButton.isVisible();
  }

  /**
   * Check if remove button is visible for a product
   */
  async isRemoveButtonVisible(productName: string): Promise<boolean> {
    const removeButton = this.page.locator(`#remove-${productName.toLowerCase().replace(/\s+/g, '-')}`);
    return await removeButton.isVisible();
  }

  /**
   * Click on the shopping cart button to view cart
   */
  async goToCart(): Promise<void> {
    await this.click(this.shoppingCartButton);
    await this.waitForPageLoad();
  }

  /**
   * Click continue shopping button (when on cart page)
   */
  async clickContinueShopping(): Promise<void> {
    const continueButton = this.page.locator('#continue-shopping');
    await this.click(continueButton);
    await this.waitForPageLoad();
  }

  /**
   * Get product price by product name
   */
  async getProductPrice(productName: string): Promise<string> {
    const priceElement = this.page.locator(`#inventory_item_${productName.toLowerCase().replace(/\s+/g, '_')}_price`);
    return await this.getElementText(priceElement);
  }

  /**
   * Get product description by product name
   */
  async getProductDescription(productName: string): Promise<string> {
    const descElement = this.page.locator(`.inventory_item_desc:has-text("${productName}")`);
    return await this.getElementText(descElement);
  }

  /**
   * Sort products by selected option
   */
  async sortProducts(sortOption: string): Promise<void> {
    await this.sortDropdown.selectOption(sortOption);
    await this.waitForPageLoad();
  }

  /**
   * Get all product names on the page
   */
  async getAllProductNames(): Promise<string[]> {
    const products = this.page.locator('.inventory_item_name');
    const count = await products.count();
    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      names.push(await products.nth(i).textContent() || '');
    }
    return names;
  }

  /**
   * Logout from the application
   */
  async logout(): Promise<void> {
    // Open the menu
    const menuButton = this.page.locator('#react-burger-menu-btn');
    await menuButton.click();
    
    // Click logout link
    const logoutLink = this.page.locator('#logout_sidebar_link');
    await logoutLink.click();
    await this.waitForPageLoad();
  }
}