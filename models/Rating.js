const mongoose = require('mongoose')

// creating tables for rating
const ratingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    ratingDate: {
        type: Date,
        default: Date.now
    },
    rating: {
        type: Number,
        default: 0
    },
})

// exporting customer from db
module.exports = mongoose.model('Rating', ratingSchema)