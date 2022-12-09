const express = require('express')

//importing customer from model folder
const CategoryModel = require('../models/Category')

const cloudinary = require("cloudinary").v2

const cloud_name = process.env.CLOUD
const api_secret = process.env.TOKEN_SECRET
const api_key = process.env.KEY
cloudinary.config({cloud_name, api_key, api_secret});

  
// bulk export of routes
const router = new express.Router()
const upload = require('../middleware/fileUpload')

// to get all category
router.get('/category/get', function (req, res) {
    CategoryModel.find()
        .then(function (data) {
            res.status(200).json({
                success:true,
                data:data
            })
        }).catch(function (error) {
            res.status(500).json({
                success:false,
                error: error
            })
        })

}) // get method

router.post('/category/insert', async function(req,res){
    try{
        const formImage = req.files.image
        const imagePath = formImage.tempFilePath
        const profile = await cloudinary.uploader.upload(imagePath,{
            public_id: req.body.categoryName+Date.now(),
            folder:"category"
        })
        const category = CategoryModel({
            categoryName: req.body.categoryName,
            categoryImageUrl: profile.secure_url
        })
        await category.save()
        .then(function (result) {
                res.status(201).json({
                    success:true,
                    message: "Category Insert successfully"
                })
            })
            .catch(function (error) {
                res.status(500).json({
                    success:false,
                    message: error
                })
            })
        console.log(category)
    } catch (error) {
        console.log(error)
    }
    res.end()
})

//exporting router
module.exports = router