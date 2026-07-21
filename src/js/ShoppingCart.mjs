import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
    const colorName = Array.isArray(item.Colors) ? item.Colors[0].ColorName : item.Colors;

    return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image || item.Images.PrimaryMedium}" alt="${item.Name}">
    </a>
    <a href="#">
      <h2 class="cart__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${colorName}</p>
    <p class="cart-card__quantity">
      Qty: <input type="number" value="${item.Quantity || 1}" data-id="${item.Id}" class="cart-quantity-input" min="1">
    </p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

export default class ShoppingCart {
    constructor(key, parentSelector) {
        this.key = key;
        this.parentSelector = parentSelector;
    }

    renderCartContents() {
        const cartItems = getLocalStorage(this.key) || [];
        const element = document.querySelector(this.parentSelector);

        if (cartItems.length === 0) {
            element.innerHTML = "<li>Votre panier est vide.</li>";
            return;
        }

        const htmlItems = cartItems.map((item) => cartItemTemplate(item));
        element.innerHTML = htmlItems.join("");

        element.addEventListener("change", (e) => {
            if (e.target.classList.contains("cart-quantity-input")) {
                this.updateQuantity(e.target.dataset.id, e.target.value);
            }
        });
    }

    updateQuantity(id, newQuantity) {
        const cartItems = getLocalStorage(this.key) || [];
        const itemIndex = cartItems.findIndex((item) => item.Id === id);

        if (itemIndex !== -1) {
            cartItems[itemIndex].Quantity = parseInt(newQuantity);
            setLocalStorage(this.key, cartItems);
            this.renderCartContents();
        }
    }
}