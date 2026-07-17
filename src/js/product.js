import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// 1. Initialize the header and footer
loadHeaderFooter();

// 2. Initialize product details
const dataSource = new ProductData("tents");
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
product.init();