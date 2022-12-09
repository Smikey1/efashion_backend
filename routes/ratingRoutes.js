const express = require('express')
const authorize = require("../middleware/auth")
const ratingController = require("../controllers/ratingController")

// bulk export of routes
const router = new express.Router()

//to insert rating
router.post('/rating/upsert/:productId/:ratingNumber', authorize.verifyUser, ratingController.upsert_new_rating) // post method

// to get rating by product
router.get('/rating/get/:productId', authorize.verifyUser, ratingController.get_rating_by_productId) // get method

// to get rating by id
router.get('/rating/getById/:id', authorize.verifyUser, ratingController.get_rating_by_id) // get method

//exporting router
module.exports = router