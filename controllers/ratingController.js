const Rating = require('../models/Rating');
const Review = require('../models/Review');


exports.upsert_new_rating = async function (req, res) {
    try {
        // Make this update into an upsert
        const ratingData = await Rating.updateOne(
            { userId: req.user.id, productId: req.params.productId },
            { $set: { rating: req.params.ratingNumber } },
            { upsert: true })

        await Review.updateMany(
            { userId: req.user.id, productId: req.params.productId },
            { $set: { rating: req.params.ratingNumber } },
        )
        console.log(ratingData)
        res.status(201).json({
            success: true,
            message: "Rating Created!",
            data: ratingData,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
} // add rating

exports.get_rating_by_productId = async function (req, res) {
    try {
        const ratingsData = await Rating.findOne({
            productId: req.params.productId, userId: req.user._id
        }).populate("productId userId")
        
        let previousRating = 0
        if (ratingsData != null) {
            previousRating = ratingsData.rating
        }
        res.status(201).json({
            success: true,
            previousRating: previousRating
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error
        })
    }
} // fetch all rating

exports.get_rating_by_id = async function (req, res) {
    const id = req.params.id
    try {
        const ratings = await Rating.findOne({ _id: id })
        res.status(201).json({
            success: true,
            data: ratings
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }

} // fetch rating by id