const mongoose = require('mongoose')

// creating tables for product
const productSchema = new mongoose.Schema({
    productName: { type: String },
    productImageUrlList: [{ type: String }],
    productType: { type: String },
    productRating: { type: Number },
    productPrice: { type: Number },
    productColor: { type: String },
    productCategory: { type: String },
    freeCoupons: { type: Number },
    offerApplied: { type: Number },
    totalRating: { type: Number },
    featureName: { type: String },
    featureValue: { type: String },
    productShortDescription: { type: String },
    productDescription: { type: String },
    productSpecification: { type: String },
    productOtherDetails: { type: String },
    productCuttedPrice: { type: Number }
})

// table name is Product
//const product= mongoose.model('Product',productSchema)

// exporting customer from db
module.exports = mongoose.model('Product', productSchema)