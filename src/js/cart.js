import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

// Initialize the dynamic header and footer
loadHeaderFooter();

// Initialize the shopping cart
const cart = new ShoppingCart("so-cart", ".product-list");
cart.renderCartContents();