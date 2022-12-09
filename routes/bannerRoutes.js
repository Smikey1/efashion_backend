const express = require('express')

//importing customer from model folder
const BannerModel = require('../models/Banner')

const cloudinary = require("cloudinary").v2

const cloud_name = process.env.CLOUD
const api_secret = process.env.TOKEN_SECRET
const api_key = process.env.KEY
cloudinary.config({ cloud_name, api_key, api_secret });


// bulk export of routes
const router = new express.Router()
const upload = require('../middleware/fileUpload')

// to get all banner
router.get('/banner/get', function (req, res) {
    BannerModel.find()
        .then(function (data) {
            res.status(200).json({
                success: true,
                data: data
            })
        }).catch(function (error) {
            res.status(500).json({
                success: false,
                error: error
            })
        })

}) // get method

// to get all banner
router.get('/banner/categoryName/:categoryName', async function (req, res) {
    try {
        const categoryName = req.params.categoryName
        let data = await BannerModel.findOne({ bannerName: categoryName })
        if (data === null) {
            data = await BannerModel.findOne({ bannerName: "Home" })
        }
        console.log(data)
        res.status(200).json({
            success: true,
            data: data.bannerImageUrlList,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            error: error
        })
    }
}) // get method

// to post banner
router.post('/banner/insert', async function (req, res) {
    try {
        const formImage = req.files.image
        const imagePath = formImage.tempFilePath
        const profile = await cloudinary.uploader.upload(imagePath, {
            public_id: req.body.bannerName + Date.now(),
            folder: "banner"
        })
        const banner = BannerModel({
            bannerName: req.body.bannerName,
            bannerImageUrl: profile.secure_url
        })
        await banner.save()
            .then(function (result) {
                res.status(201).json({
                    success: true,
                    message: "Banner Insert successfully"
                })
            })
            .catch(function (error) {
                res.status(500).json({
                    success: false,
                    message: error
                })
            })
        console.log(banner)
    } catch (error) {
        console.log(error)
    }
    res.end()
})

// to update banner
router.put("/banner/update/:id", async function (req, res) {
    const id = req.params.id
    const banner = await BannerModel.findOne({ _id: id })
    console.log(banner)
    try {
        const updateImage = [...banner.bannerImageUrlList] // array ma basexa
        const formImage = req.files.image
        const imagePath = formImage.tempFilePath
        const image = await cloudinary.uploader.upload(imagePath, {
            public_id: banner.bannerName + Date.now(),
            folder: "Banner"
        })
        updateImage.push(image.secure_url)
        banner.bannerImageUrlList = updateImage
        await banner.save()
        res.status(200).json({
            success: true,
            message: "Banner upload successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
    res.end()
})
//exporting router
module.exports = router