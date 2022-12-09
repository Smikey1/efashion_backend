const Review = require('../models/Review');
const Rating = require('../models/Rating');

exports.add_new_review = async function (req, res) {
    try {
        let rating = await Rating.findOne({
            productId: req.params.id, userId: req.user._id
        })
        let previousRating = 0
        if (rating != null) {
            previousRating = rating.rating
        }
        const reviewData = new Review({
            userId: req.user.id,
            productId: req.params.id,
            review: req.body.review,
            rating: previousRating
        });
        console.log(reviewData)
        const saved = await reviewData.save()
        res.status(201).json({
            success: true,
            message: "Review Created!",
            data: saved,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
} // add review

exports.update_review = async function (req, res) {
    const review_id = req.params.id;
    const user_id = req.user.id;
    const review = req.body.review;
    try {
        let updatedReview = await Review.updateOne({
            _id: review_id
        }, {
            review: review, userId: user_id
        }, { new: true })

        res.status(201).json({
            success: true,
            message: "Review Updated Succesfully!",
            // async and await ma return garne tarika
            data: updatedReview,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
} //update review

exports.delete_review = async function (req, res) {
    const review_id = req.params.id;
    try {
        await Review.deleteMany({
            _id: review_id
        })
        res.status(201).json({
            success: true,
            message: "Review Deleted Succesfully!"
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
} // delete review

exports.get_review_by_productId = async function (req, res) {
    try {
        const reviewsData = await Review.find({ productId: req.params.productId }).populate("userId")
        console.log(reviewsData)
        res.status(201).json({
            success: true,
            data: reviewsData
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
} // fetch all review

exports.get_all_review = async function (req, res) {
    try {
        const reviewsData = await Review.find().populate("userId")
        res.status(201).json({
            success: true,
            data: reviewsData
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
} // fetch all review

exports.get_review_by_id = async function (req, res) {
    // const id = req.user._id
    const id = req.params.id
    try {
        const reviews = await Review.findOne({ _id: id })
        res.status(201).json({
            success: true,
            data: reviews
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }

} // fetch review by id

exports.get_review_by_userId = async function (req, res) {
    try {
        const review = await Review.find({ userId: req.user._id })
        res.status(201).json({
            success: true,
            data: review
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }

} // fetch review by user id