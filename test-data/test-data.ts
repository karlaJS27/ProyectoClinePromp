/**
 * Test data for Sauce Demo automation tests
 */

export interface UserData {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export interface Credentials {
  username: string;
  password: string;
}

/**
 * Valid user credentials for Sauce Demo
 */
export const validCredentials: Credentials = {
  username: process.env.TEST_USERNAME || 'standard_user',
  password: process.env.TEST_PASSWORD || 'secret_sauce',
};

/**
 * Checkout information for a valid order
 */
export const checkoutInfo: UserData = {
  firstName: 'John',
  lastName: 'Doe',
  postalCode: '12345',
};

/**
 * Product names available in Sauce Demo
 */
export const products = {
  sauceLabsBike: "Sauce Labs Bike",
  sauceLabsBoltTShirt: "Sauce Labs Bolt T-Shirt",
  sauceLabsBackpack: "Sauce Labs Backpack",
  sauceLabsFleeceJacket: "Sauce Labs Fleece Jacket",
  sauceLabsOnesie: "Sauce Labs Onesie",
  testAllTheThingsTShirt: "Test.allTheThings() T-Shirt (Red)",
} as const;

/**
 * List of all product names
 */
export const allProducts = Object.values(products);

/**
 * Sort options for products
 */
export const sortOptions = {
  priceLowToHigh: 'lohi',
  priceHighToLow: 'hilo',
  nameAZ: 'az',
  nameZA: 'za',
} as const;