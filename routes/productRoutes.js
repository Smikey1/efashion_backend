const express = require('express')

//importing customer from model folder
const ProductModel = require('../models/Product')

// bulk export of routes
const router = new express.Router()
const upload = require('../middleware/fileUpload')
const productController = require("../controllers/productController")

//to insert product
router.post('/product/insert', productController.add_new_product) // post method

// to update product
router.put('/product/update/:id', productController.update_product) //put method

// to delete product
router.delete('/product/delete/:id', productController.delete_product) //delete method

// to get all product
router.get('/product/get', productController.get_all_product) // get method

// to get product by id
router.get('/product/getById/:id', productController.get_product_by_id) // get method

// to get all product by categoryName
router.get('/product/category/:categoryName', productController.get_product_by_categoryName) // get method

// to get all product by productName
router.get('/product/fetch/:productName', productController.get_product_by_productName) // get method

// to get all product by productName
router.get('/product/search/:pattern', productController.get_product_by_searchProduct) // get method

// to update product image
router.put('/product/image/upload/:id', productController.update_product_images) // put method

//exporting router
module.exports = router