const express = require("express");
const { authenticate } = require("../Middlewares/authenticate");
const { ProductController } = require("../Controllers/product.controller");

const ProductRouter = express.Router();

// create new product
ProductRouter.post('/', authenticate, ProductController.createProduct);

// get all products
ProductRouter.get('/', authenticate, ProductController.getAllProducts);

// get signle product by Id
ProductRouter.get('/:id', authenticate, ProductController.getProductById);

// update product by Id
ProductRouter.patch('/:id', authenticate, ProductController.updateProduct);

// delete product by id
ProductRouter.delete("/:id", authenticate, ProductController.deleteProduct);

module.exports = {
    ProductRouter
};