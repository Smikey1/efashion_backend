const mongoose = require('mongoose')

// creating tables for wishlist
const wishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    isInWishlist:{ type: Boolean, default: false }
})

// exporting customer from db
module.exports = mongoose.model('Wishlist', wishlistSchema)


