const express = require('express')
const authorize = require("../middleware/auth")
const reviewController = require("../controllers/reviewController")

//importing review from model folder
const reviewModel = require('../models/Review')

// bulk export of routes
const router = new express.Router()


//to insert review
router.post('/review/insert/:id', authorize.verifyUser, reviewController.add_new_review) // post method

// to update review
router.put('/review/update/:id', authorize.verifyUser, reviewController.update_review) //put method

// to delete review
router.delete('/review/delete/:id', authorize.verifyUser, reviewController.delete_review) //delete method

// to get all review
router.get('/review/get', reviewController.get_all_review) // get method

// to get review by id
router.get('/review/getById/:id', authorize.verifyUser, reviewController.get_review_by_id) // get method

// to get review by id
router.get('/review/getByProduct/:productId', authorize.verifyUser, reviewController.get_review_by_productId) // get method

// to get review by userId
router.get('/review/get/userId', authorize.verifyUser, reviewController.get_review_by_userId) // get method

//exporting router
module.exports = router