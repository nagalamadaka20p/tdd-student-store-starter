const {storage} = require("../data/storage");
const { BadRequestError } = require("../utils/error");

const formatter = new Intl.NumberFormat(
    "en-US", {
        currency: 'USD',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    }
);

function findProductById(newProducts, id){

        for (let i = 0; i < newProducts.length; i++){
            if (Number(newProducts[i].id) === Number(id)){
                return newProducts[i];
            }
        }
    return null;    
}

function calculateSubtotal(cart, products){
    const cartItems = Object.values(cart);
    var acc = 0;
    cartItems.forEach((item) => {
        const product = findProductById(products, item.itemId);
        acc += product.price * item.quantity;
    }
    )
    
    return Number(acc);
}

function totalWithTax(subtotal){
    const total =  subtotal * 1.0875;
    return formatter.format(total);
}

function createReceipt(cart, products, total, subtotal, userInfo){
    let eachLineReceipt = [];
    const cartItems = Object.values(cart);
    eachLineReceipt.push(`${userInfo.name}'s Receipt`);
    const receipt = cartItems.map((item) => {
        const product = findProductById(products, item.itemId);
        return {
            name: product.name,
            price: formatter.format(product.price),
            quantity: item.quantity,
        }
    }).map((item) => {
        eachLineReceipt.push( `${item.quantity} x ${item.name} @ ${item.price}`);
    });
    eachLineReceipt.push(`Subtotal: $${formatter.format(subtotal)}`);
    eachLineReceipt.push(`Total: $${formatter.format(total)}`);
    return eachLineReceipt;
}

class Store {
    constructor(){
        this.super();
    }

    static async listProducts(){
        const products = storage.get("products").value();
        return {products};
    }

    static async fetchProductById(productId){
        var allProducts = await this.listProducts();
        let newProducts = allProducts.products;
        return findProductById(newProducts, productId);

    }

    static async purchaseProducts(cart, userInfo){
        if (!cart || !Object.keys(cart).length){
            throw new BadRequestError("Cart is empty", 400);
        }

        if (!userInfo || !Object.keys(userInfo).length){
            throw new BadRequestError("No user info found", 400);
        }

        //make sure each item in shopping cart is valid
        const requiredFields = ["itemId", "quantity"]
        cart.forEach((item)=>{
            requiredFields.forEach((field)=>{
                if (!item[field]){
                    throw new BadRequestError(`${field} is required`, 400);
                }
            }
            )
        })

        //throw an error if there are duplicate items in cart
        const cartItems = Object.values(cart);
        const itemIds = cartItems.map((item) => item.itemId);
        const uniqueItemIds = [...new Set(itemIds)];
        if (itemIds.length !== uniqueItemIds.length){
            throw new BadRequestError("Duplicate items in cart", 400);
        }

        const products = storage.get('products').value();
        const subtotal = Number(calculateSubtotal(cart, products));
        const total = Number(totalWithTax(subtotal));

        const receipt = createReceipt(cart, products, total, subtotal, userInfo);

        const purchase = {
            id: products.length+1,
            name: userInfo.name,
            email: userInfo.email,
            order: cart,
            total,
            createdAt: new Date().toISOString(),
            receipt,
        }
        
        storage.get("purchases").push(purchase).write();
        return {"purchase": purchase};
    }
}

module.exports = Store;