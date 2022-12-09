const express = require('express')
const authorize = require("../middleware/auth")
const cartController = require("../controllers/cartController")

// bulk export of routes
const router = new express.Router()

//to insert cart
router.post('/cart/insert/:id', authorize.verifyUser, cartController.add_new_cart) // post method

// to update cart
router.put('/cart/update/:id/:quantity', authorize.verifyUser, cartController.update_cart) //put method

// to delete cart
router.delete('/cart/delete/:id', authorize.verifyUser, cartController.delete_cart) //delete method

// to get all cart
router.get('/cart/get', authorize.verifyUser, cartController.get_all_cart) // get method


//exporting router
module.exports = router