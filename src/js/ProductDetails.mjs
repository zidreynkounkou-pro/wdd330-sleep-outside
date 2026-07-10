import { getLocalStorage, setLocalStorage } from "./utils.mjs";


/*function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
} */



export default class ProductDetails {
    constructorn(productId, dataSource) {

        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;

    }


    async init() {

        // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        this.product = await this.dataSource.findProductById(this.productId);
        // Get the product details before rendering the HTML
        this.renderProductDetails();
        // Once the HTML is rendered, add an EnventListener to the Add to cart button
        // Notice the .bind(this). This callback will not work if the bind(this) is missing.
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this));

    
    }
    

    addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
    }

    renderProductDetails() {
        productDetailsTemplate(this.product);
    } 


}

function productDetailsTemplate(product) {
    document.querySelector("h2").textContent = product.Brand.Name;
    document.querySelector("h3").textContent = product.NameWithoutBrand;

    const productImage = document.getElementById("productImage");
    productImage.src = product.Image;
    productImage.alt = product.NameWithoutBrand;


    document.getElementById("productPrice").textContent = product.FinalPrice;
    document.getElementById("productColor").textContent = product.Colors[0].ColorName;
    document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple;

    document.getElementById("addToCart").dataset.id = product.Id;

}




/*

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
    .addEventListener("click", addToCartHandler);
*/