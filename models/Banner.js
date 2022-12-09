const mongoose = require('mongoose')

// creating tables for Banner
const bannerSchema = new mongoose.Schema({
    bannerName: { type: String },
    bannerImageUrlList: [{ type: String }]
})


// exporting bannerlist from db
module.exports = mongoose.model('Banner', bannerSchema)