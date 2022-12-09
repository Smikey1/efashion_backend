const mongoose = require('mongoose')

// creating tables for review
const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    reviewDate: {
        type: Date,
        default: Date.now
    },
    review: {
        type: String
    },
    rating: {
        type: Number,
        default: 0
    }
})

// exporting customer from db
module.exports = mongoose.model('Review', reviewSchema)