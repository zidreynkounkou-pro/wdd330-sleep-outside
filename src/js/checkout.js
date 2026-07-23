import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

// Load header and footer templates
loadHeaderFooter();

// Initialize the checkout process, passing the localStorage key and the summary section selector
const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();

// Listen for zip code changes to calculate tax, shipping, and order totals
document.querySelector("#zip").addEventListener("blur", () => {
    myCheckout.calculateOrderTotal();
});

// Listen for form submission
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
    e.preventDefault();
    const myForm = document.forms["checkout"];

    // Check if all required fields are filled out
    if (myForm.checkValidity()) {
        myCheckout.checkout(myForm);
    } else {
        // Show validation errors to the user if fields are missing
        myForm.reportValidity();
    }
});