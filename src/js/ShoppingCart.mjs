import {getLocalStorage} from "./utils.mjs";



function cartItemTemplate(item) {
    return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}">
    </a>
    <a href="#">
    <h2 class="cart__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors}</p>
    <p class"cart-card__quantity">qty:1</p>
    <p cart-card__price">${item.FinalPrice}</p>
  </li>`;
}





export default class ShoppingCart {
    constructor(key, parentSelector) {
        // Allow code reusability
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



        const htmlItems = cartItems.map(item) => cartItemTemplate(item);
        element.innerHTML = htmlItems.join("");
    }



}