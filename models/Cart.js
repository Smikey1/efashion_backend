const mongoose = require('mongoose')

// creating tables for cart
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity:{
        type:Number,
        default:1
    }
})

// exporting customer from db
module.exports = mongoose.model('Cart', cartSchema)