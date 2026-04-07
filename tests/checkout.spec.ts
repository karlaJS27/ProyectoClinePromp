import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';
import { CheckoutPage } from '../pages/checkout.page';
import { validCredentials, checkoutInfo, products } from '../test-data/test-data';

test.describe('Checkout Functionality', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    checkoutPage = new CheckoutPage(page);

    // Login before each checkout test
    await loginPage.goto();
    await loginPage.login(validCredentials.username, validCredentials.password);
    await expect(productsPage.isProductsPageLoaded()).resolves.toBe(true);
  });

  test('should complete a full checkout flow successfully', async ({ page }) => {
    // Arrange - Add product to cart
    await productsPage.addProductToCart(products.sauceLabsBike);
    await productsPage.goToCart();

    // Act - Go to checkout
    await checkoutPage.clickCheckout();
    await expect(checkoutPage.isCheckoutInfoPage()).resolves.toBe(true);

    // Act - Fill checkout information
    await checkoutPage.fillCheckoutInfo(
      checkoutInfo.firstName,
      checkoutInfo.lastName,
      checkoutInfo.postalCode
    );
    await checkoutPage.clickContinue();
    await expect(checkoutPage.isCheckoutOverviewPage()).resolves.toBe(true);

    // Act - Finish checkout
    await checkoutPage.clickFinish();
    await expect(checkoutPage.isCompletionPage()).resolves.toBe(true);

    // Assert - Verify completion
    await expect(checkoutPage.getCompletionTitle()).resolves.toBe('Checkout: Complete!');
    await expect(checkoutPage.getCompletionMessage()).resolves.toMatch(/Thank you for your order/);

    // Act - Go back to products
    await checkoutPage.clickBackHome();
    await expect(productsPage.isProductsPageLoaded()).resolves.toBe(true);
  });

  test('should display cart page with correct title', async ({ page }) => {
    // Arrange - Add product to cart
    await productsPage.addProductToCart(products.sauceLabsBoltTShirt);
    await productsPage.goToCart();

    // Assert
    await expect(checkoutPage.isCartPage()).resolves.toBe(true);
    await expect(checkoutPage.getCartPageTitle()).resolves.toBe('Your Cart');
    await expect(checkoutPage.getCartItemCount()).resolves.toBe(1);
  });

  test('should display checkout information page correctly', async ({ page }) => {
    // Arrange - Add product and go to checkout
    await productsPage.addProductToCart(products.sauceLabsBackpack);
    await productsPage.goToCart();
    await checkoutPage.clickCheckout();

    // Assert
    await expect(checkoutPage.isCheckoutInfoPage()).resolves.toBe(true);
    await expect(checkoutPage.getCheckoutInfoTitle()).resolves.toBe('Checkout: Your Information');
  });

  test('should display checkout overview page correctly', async ({ page }) => {
    // Arrange - Add product and fill checkout info
    await productsPage.addProductToCart(products.sauceLabsFleeceJacket);
    await productsPage.goToCart();
    await checkoutPage.clickCheckout();
    await checkoutPage.fillCheckoutInfo(
      checkoutInfo.firstName,
      checkoutInfo.lastName,
      checkoutInfo.postalCode
    );
    await checkoutPage.clickContinue();

    // Assert
    await expect(checkoutPage.isCheckoutOverviewPage()).resolves.toBe(true);
    await expect(checkoutPage.getCheckoutOverviewTitle()).resolves.toBe('Checkout: Overview');
  });

  test('should display item total, tax, and total on overview page', async ({ page }) => {
    // Arrange - Complete checkout flow up to overview
    await productsPage.addProductToCart(products.sauceLabsOnesie);
    await productsPage.goToCart();
    await checkoutPage.clickCheckout();
    await checkoutPage.fillCheckoutInfo(
      checkoutInfo.firstName,
      checkoutInfo.lastName,
      checkoutInfo.postalCode
    );
    await checkoutPage.clickContinue();

    // Assert - Verify pricing information is displayed
    const itemTotal = await checkoutPage.getItemTotalOverview();
    expect(itemTotal).toMatch(/\$\d+\.\d+/);

    const tax = await checkoutPage.getTaxOverview();
    expect(tax).toMatch(/\$\d+\.\d+/);

    const total = await checkoutPage.getTotalOverview();
    expect(total).toMatch(/\$\d+\.\d+/);
  });

  test('should continue shopping from cart', async ({ page }) => {
    // Arrange - Add product and go to cart
    await productsPage.addProductToCart(products.testAllTheThingsTShirt);
    await productsPage.goToCart();

    // Act - Continue shopping
    await checkoutPage.clickContinueShopping();

    // Assert - Should be back on products page
    await expect(productsPage.isProductsPageLoaded()).resolves.toBe(true);
    await expect(productsPage.getPageTitleText()).resolves.toBe('Products');
  });

  test('should complete checkout with multiple items in cart', async ({ page }) => {
    // Arrange - Add multiple products to cart
    await productsPage.addProductToCart(products.sauceLabsBike);
    await productsPage.addProductToCart(products.sauceLabsBoltTShirt);
    await productsPage.addProductToCart(products.sauceLabsBackpack);
    await productsPage.goToCart();

    // Assert - Verify 3 items in cart
    await expect(checkoutPage.getCartItemCount()).resolves.toBe(3);

    // Act - Complete checkout
    await checkoutPage.clickCheckout();
    await checkoutPage.fillCheckoutInfo(
      checkoutInfo.firstName,
      checkoutInfo.lastName,
      checkoutInfo.postalCode
    );
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();

    // Assert - Verify completion
    await expect(checkoutPage.isCompletionPage()).resolves.toBe(true);
  });
});