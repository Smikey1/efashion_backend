const mongoose = require('mongoose')

// creating tables for product
const categorySchema = new mongoose.Schema({
    categoryName: { type: String },
    categoryImageUrl: { type: String },
})

module.exports = mongoose.model('Category', categorySchema)