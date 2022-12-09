const mongoose = require('mongoose')

// creating tables for order
const orderSchema = new mongoose.Schema({
    deliveryStatusMessage:{
        type: String,
        enum: ['Pending', 'Cancelled',"Completed"],
        default: 'Pending'
    },
    deliveryDate:String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    order:[
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"  
            },
            qty:{
                type: Number
            },
        }
    ]
})
// exporting order from db
module.exports = mongoose.model('Order', orderSchema)