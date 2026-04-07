# ProyectoClinePromp - Playwright Web Automation Project

A web automation testing project built with **Playwright** and **TypeScript**, following the **Page Object Model (POM)** design pattern. This project focuses on testing the [Sauce Demo](https://sauce-demo.myshopify.com/) e-commerce application.

## 🎯 Project Overview

This automation framework is designed to test the following functionalities of the Sauce Demo application:
- **Login** - User authentication
- **My Cart** - Shopping cart management (add/remove items)
- **Checkout** - Complete purchase flow

## 🏗️ Project Structure

```
ProyectoClinePromp/
├── pages/                    # Page Object classes
│   ├── base.page.ts          # Base page with common methods
│   ├── login.page.ts         # Login page object
│   ├── products.page.ts      # Products/Inventory page object
│   └── checkout.page.ts      # Checkout page object (Cart, Info, Overview, Completion)
├── tests/                    # Test specifications
│   ├── login.spec.ts         # Login functionality tests
│   ├── cart.spec.ts          # Cart functionality tests
│   └── checkout.spec.ts      # Checkout functionality tests
├── test-data/                # Test data and fixtures
│   └── test-data.ts          # Centralized test data
├── playwright.config.ts      # Playwright configuration
├── tsconfig.json             # TypeScript configuration
├── .env                      # Environment variables (credentials)
├── .gitignore                # Git ignore rules
└── package.json              # Project dependencies and scripts
```

## 🛠️ Technologies Used

- **Playwright** - Modern web automation framework
- **TypeScript** - Type-safe JavaScript
- **Page Object Model (POM)** - Design pattern for maintainable test code
- **dotenv** - Environment variable management

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/karlaJS27/ProyectoClinePromp.git
cd ProyectoClinePromp
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

4. Configure environment variables:
   - Copy `.env` file and update with your credentials if needed
   - Default credentials are set for Sauce Demo's standard user

## 🚀 Running Tests

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm test` or `npm run test:headless` | Run all tests in headless mode |
| `npm run test:headed` | Run tests in headed mode (visible browser) |
| `npm run test:chromium` | Run tests only on Chromium |
| `npm run test:firefox` | Run tests only on Firefox |
| `npm run test:webkit` | Run tests only on WebKit (Safari) |
| `npm run test:debug` | Run tests in debug mode |
| `npm run test:ui` | Run tests with Playwright UI mode |
| `npm run report` or `npm run report:open` | Open the HTML test report |

### Examples

Run all tests in headless mode:
```bash
npm test
```

Run tests with visible browser:
```bash
npm run test:headed
```

Run only login tests:
```bash
npm test -- --grep "Login"
```

Run tests on a specific browser:
```bash
npm run test:firefox
```

## 📊 Test Reports

After running tests, an HTML report is automatically generated. To view the report:

```bash
npm run report
```

The report will open in your default browser at `http://localhost:XXXX`.

## 🧪 Test Coverage

### Login Functionality (`tests/login.spec.ts`)
- Successful login with valid credentials
- Login page display verification
- Logout functionality

### Cart Functionality (`tests/cart.spec.ts`)
- Add product to cart
- Add multiple products to cart
- Remove product from cart
- Navigate to cart page
- Continue shopping from cart
- Product details verification
- Sort products

### Checkout Functionality (`tests/checkout.spec.ts`)
- Complete checkout flow
- Cart page verification
- Checkout information page
- Checkout overview page
- Order completion
- Multiple items checkout

## 🔧 Configuration

### Playwright Configuration (`playwright.config.ts`)

Key settings:
- **Timeout**: 60 seconds per test
- **Retry**: 0 retries (2 on CI)
- **Reporter**: HTML report + List reporter
- **Browsers**: Chromium, Firefox, WebKit
- **Viewport**: 1920x1080
- **Screenshots**: On failure
- **Video**: On failure

### Environment Variables (`.env`)

```env
# Base URL for the application
BASE_URL=https://sauce-demo.myshopify.com/

# Test credentials
TEST_USERNAME=standard_user
TEST_PASSWORD=secret_sauce
```

## 🎯 Page Object Model (POM)

The project follows the Page Object Model design pattern for better maintainability and reusability:

### BasePage (`pages/base.page.ts`)
Common methods shared across all pages:
- `navigateTo(path)` - Navigate to a URL
- `click(locator)` - Click an element
- `fill(locator, value)` - Fill input field
- `getElementText(locator)` - Get element text
- `isElementVisible(locator)` - Check visibility
- `waitForPageLoad()` - Wait for page load

### LoginPage (`pages/login.page.ts`)
Login page specific methods:
- `goto()` - Navigate to login page
- `login(username, password)` - Perform login
- `getPageTitleText()` - Get page title

### ProductsPage (`pages/products.page.ts`)
Products/inventory page methods:
- `isProductsPageLoaded()` - Check if page loaded
- `addProductToCart(productName)` - Add item to cart
- `removeProductFromCart(productName)` - Remove item from cart
- `goToCart()` - Navigate to cart
- `logout()` - Logout from application

### CheckoutPage (`pages/checkout.page.ts`)
Checkout flow methods:
- Cart page: `getCartItemCount()`, `clickCheckout()`
- Info page: `fillCheckoutInfo()`, `clickContinue()`
- Overview page: `getItemTotalOverview()`, `clickFinish()`
- Completion page: `getCompletionTitle()`, `clickBackHome()`

## 🌐 Browser Support

The project is configured to run on all browsers supported by Playwright:
- **Chromium** (Chrome, Edge, etc.)
- **Firefox**
- **WebKit** (Safari)

## 📝 Out of Scope

The following items are explicitly out of scope for this project:
- Negative scenarios and edge cases
- CI/CD configuration
- Integration with external reporting tools

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

ISC

## 🔗 Links

- **Repository**: [GitHub](https://github.com/karlaJS27/ProyectoClinePromp)
- **Sauce Demo**: [https://sauce-demo.myshopify.com/](https://sauce-demo.myshopify.com/)
- **Playwright Docs**: [https://playwright.dev/](https://playwright.dev/)