import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
        convertedJSON = {};

    formData.forEach(function (value, key) {
        convertedJSON[key] = value;
    });

    return convertedJSON;
}

function packageItems(items) {
    return items.map((item) => ({
        id: item.id || item.Id,
        name: item.name || item.Name,
        price: item.finalPrice || item.FinalPrice || item.price,
        quantity: item.quantity || item.Quantity,
    }));
}

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key) || [];
        this.calculateItemSubTotal();
    }

    calculateItemSubTotal() {
        const summaryElement = document.querySelector(`${this.outputSelector} #cartTotal`);
        const itemNumElement = document.querySelector(`${this.outputSelector} #num-items`);

        let count = 0;
        this.itemTotal = this.list.reduce((sum, item) => {
            const qty = item.quantity || item.Quantity || 0;
            const price = item.finalPrice || item.FinalPrice || item.price || 0;

            count += qty;
            return sum + (price * qty);
        }, 0);

        if (itemNumElement) itemNumElement.innerText = count;
        if (summaryElement) summaryElement.innerText = `$${this.itemTotal.toFixed(2)}`;

        this.calculateOrderTotal();
    }

    calculateOrderTotal() {
        const totalItems = this.list.reduce((sum, item) => sum + (item.quantity || item.Quantity || 0), 0);
        this.shipping = totalItems > 0 ? 10 + (totalItems - 1) * 2 : 0;

        this.tax = this.itemTotal * 0.06;
        this.orderTotal = this.itemTotal + this.shipping + this.tax;

        this.displayOrderTotals();
    }

    displayOrderTotals() {
        const taxElement = document.querySelector(`${this.outputSelector} #tax`);
        const shippingElement = document.querySelector(`${this.outputSelector} #shipping`);
        const orderTotalElement = document.querySelector(`${this.outputSelector} #orderTotal`);

        if (taxElement) taxElement.innerText = `$${this.tax.toFixed(2)}`;
        if (shippingElement) shippingElement.innerText = `$${this.shipping.toFixed(2)}`;
        if (orderTotalElement) orderTotalElement.innerText = `$${this.orderTotal.toFixed(2)}`;
    }

    async checkout(form) {
        const formData = formDataToJSON(form);

        const order = {
            ...formData,
            orderDate: new Date().toISOString(),
            items: packageItems(this.list),
            orderTotal: this.orderTotal.toFixed(2),
            shipping: this.shipping,
            tax: this.tax.toFixed(2),
        };

        try {
            const res = await services.checkout(order);
            console.log(res);
            window.location.href = "../checkout/success.html";
        } catch (err) {
            console.error(err);
        }
    }
}