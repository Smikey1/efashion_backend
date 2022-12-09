const mongoose = require('mongoose')

// creating tables for product
const blogSchema = new mongoose.Schema({
    blogName: { type: String },
    blogImageUrl: { type: String },
    blogDescription: { type: String },
})

module.exports = mongoose.model('Blog', blogSchema)