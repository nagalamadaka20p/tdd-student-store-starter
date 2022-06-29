const express = require('express');
const router = express.Router();
const StoreModel = require('../model/store');
const { NotFoundError } = require('../utils/error');

//return array of all products
router.get('/', async (req, res, next) => {
    try{
        const products = await StoreModel.listProducts();
        res.status(200).json(products);
    }
    catch (err) {
        next(err)
    }
})

//fetch single product
router.get('/:productId', async (req, res, next) => {
    try{
        const productId = req.params.productId;
        const product = await StoreModel.fetchProductById(productId);
        if (!product) {
            throw new NotFoundError('Product not found');
        }
        res.status(200).json({"product": product})
    }
    catch (err){
        next(err);
    }  
})

//create new purchase
router.post('/', async(req, res, next) =>{
    try{
        const cart = req.body.shoppingCart;
        const userInfo = req.body.user;
        const newPurchase = await StoreModel.purchaseProducts(cart, userInfo)
        res.status(201).json(newPurchase)
    }
    catch (err){
        next(err);
    }
})

module.exports = router