import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

// Initialize the ShoppingCart class
// Assuming "so-cart" is your storage key and ".product-list" is your container
const cart = new ShoppingCart("so-cart", ".product-list");

// Call the render method from the class
cart.renderCartContents();