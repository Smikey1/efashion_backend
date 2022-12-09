const express = require('express')
const authorize = require("../middleware/auth")
const wishlistController = require("../controllers/wishlistController")

// bulk export of routes
const router = new express.Router()

//to insert wishlist
router.post('/wishlist/insert/:id', authorize.verifyUser, wishlistController.add_new_wishlist) // post method

// to delete wishlist
router.delete('/wishlist/delete/:id', authorize.verifyUser, wishlistController.delete_wishlist) //delete method

// to get all wishlist
router.get('/wishlist/get', authorize.verifyUser, wishlistController.get_all_wishlist) // get method


//exporting router
module.exports = router