import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

// 1. Initialize Header and Footer
loadHeaderFooter();

// 2. Initialize Checkout Process
const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();

// 3. Handle Form Submission
document
    .querySelector("#checkoutSubmit")
    .addEventListener("click", (e) => {
        e.preventDefault();
        myCheckout.checkout();
    });