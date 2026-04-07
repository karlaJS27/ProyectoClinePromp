import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';
import { validCredentials } from '../test-data/test-data';

test.describe('Login Functionality', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.login(validCredentials.username, validCredentials.password);

    // Assert
    await expect(productsPage.isProductsPageLoaded()).resolves.toBe(true);
    await expect(productsPage.getPageTitleText()).resolves.toBe('Products');
  });

  test('should display login page on initial load', async ({ page }) => {
    // Arrange & Act
    await loginPage.goto();

    // Assert
    await expect(loginPage.getPageTitleText()).resolves.toBe('Swag Labs');
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    // Arrange - Login first
    await loginPage.goto();
    await loginPage.login(validCredentials.username, validCredentials.password);
    await expect(productsPage.isProductsPageLoaded()).resolves.toBe(true);

    // Act - Logout
    await productsPage.logout();

    // Assert - Should be back on login page
    await expect(loginPage.getPageTitleText()).resolves.toBe('Swag Labs');
    await expect(loginPage.usernameInput).toBeVisible();
  });
});