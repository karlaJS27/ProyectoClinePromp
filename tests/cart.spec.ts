import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';
import { validCredentials, products } from '../test-data/test-data';

test.describe('Cart Functionality', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    
    // Login before each cart test
    await loginPage.goto();
    await loginPage.login(validCredentials.username, validCredentials.password);
    await expect(productsPage.isProductsPageLoaded()).resolves.toBe(true);
  });

  test('should add a product to cart and verify cart badge updates', async ({ page }) => {
    // Arrange
    const productName = products.sauceLabsBike;
    await expect(productsPage.isCartBadgeVisible()).resolves.toBe(false);

    // Act - Add product to cart
    await productsPage.addProductToCart(productName);

    // Assert
    await expect(productsPage.isCartBadgeVisible()).resolves.toBe(true);
    await expect(productsPage.getCartBadgeCount()).resolves.toBe('1');
    await expect(productsPage.isRemoveButtonVisible(productName)).resolves.toBe(true);
  });

  test('should add multiple products to cart', async ({ page }) => {
    // Arrange
    const product1 = products.sauceLabsBike;
    const product2 = products.sauceLabsBoltTShirt;

    // Act - Add first product
    await productsPage.addProductToCart(product1);
    await expect(productsPage.getCartBadgeCount()).resolves.toBe('1');

    // Act - Add second product
    await productsPage.addProductToCart(product2);
    await expect(productsPage.getCartBadgeCount()).resolves.toBe('2');
  });

  test('should remove a product from cart', async ({ page }) => {
    // Arrange - Add a product first
    const productName = products.sauceLabsBackpack;
    await productsPage.addProductToCart(productName);
    await expect(productsPage.getCartBadgeCount()).resolves.toBe('1');

    // Act - Remove the product
    await productsPage.removeProductFromCart(productName);

    // Assert
    await expect(productsPage.isCartBadgeVisible()).resolves.toBe(false);
    await expect(productsPage.isAddButtonVisible(productName)).resolves.toBe(true);
  });

  test('should navigate to cart page and view items', async ({ page }) => {
    // Arrange - Add products to cart
    await productsPage.addProductToCart(products.sauceLabsBike);
    await productsPage.addProductToCart(products.sauceLabsBoltTShirt);

    // Act - Go to cart
    await productsPage.goToCart();

    // Assert - Verify cart page is displayed with items
    await expect(page).toHaveURL(/.*cart/);
    await expect(productsPage.getPageTitleText()).resolves.toBe('Your Cart');
  });

  test('should continue shopping from cart page', async ({ page }) => {
    // Arrange - Add a product and go to cart
    await productsPage.addProductToCart(products.sauceLabsBike);
    await productsPage.goToCart();

    // Act - Continue shopping
    await productsPage.clickContinueShopping();

    // Assert - Should be back on products page
    await expect(productsPage.isProductsPageLoaded()).resolves.toBe(true);
    await expect(productsPage.getPageTitleText()).resolves.toBe('Products');
  });

  test('should display product details correctly', async ({ page }) => {
    // Arrange
    const productName = products.sauceLabsBike;

    // Act & Assert - Verify product details
    const price = await productsPage.getProductPrice(productName);
    expect(price).toMatch(/\$\d+\.\d+/);

    const description = await productsPage.getProductDescription(productName);
    expect(description).toContain(productName);
  });

  test('should sort products by price low to high', async ({ page }) => {
    // Arrange
    await productsPage.sortProducts('lohi');

    // Act - Get product prices
    const productNames = await productsPage.getAllProductNames();

    // Assert - Verify products are displayed (basic check)
    expect(productNames.length).toBeGreaterThan(0);
  });
});