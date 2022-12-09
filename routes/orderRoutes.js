const express = require('express')
const authorize = require("../middleware/auth")
const orderController = require("../controllers/orderController")

// bulk export of routes
const router = new express.Router()

//to insert order
router.post('/order/insert', authorize.verifyUser, orderController.add_new_order) // post method

// to update order
router.put('/order/update/:id', authorize.verifyUser, orderController.update_order) //put method

// to delete order
router.delete('/order/delete/:id', authorize.verifyUser, orderController.delete_order) //delete method

// to get order by id
router.get('/order/getById/:id', authorize.verifyUser, orderController.get_order_by_id) // get method 

// to get all order
router.get('/order/get', authorize.verifyUser, orderController.get_all_order) // get method

//exporting router
module.exports = router