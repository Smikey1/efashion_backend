const express = require('express')

//importing customer from model folder
const Blog = require('../models/Blog')

// cloudinary for uploading images into server
const cloudinary = require("cloudinary").v2
const cloud_name = process.env.CLOUD
const api_secret = process.env.TOKEN_SECRET
const api_key = process.env.KEY
cloudinary.config({ cloud_name, api_key, api_secret });


// bulk export of routes
const router = new express.Router()
const upload = require('../middleware/fileUpload')

// to get all blog
router.get('/blog/get', function (req, res) {
    Blog.find()
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

// to insert blog
router.post('/blog/insert', async function (req, res) {
    try {
        const blog = Blog({
            blogName: req.body.blogName,
            blogDescription: req.body.blogDescription
        })
        await blog.save()
            .then(function (result) {
                res.status(201).json({
                    success: true,
                    message: "Blog Insert successfully"
                })
            })
            .catch(function (error) {
                res.status(500).json({
                    success: false,
                    message: error
                })
            })
        console.log(blog)
    } catch (error) {
        console.log(error)
    }
    res.end()
})  // insert method

// to update blog
router.put('/blog/update/:id', async function (req, res) {
    try {
        let updatedBlog = await Blog
            .updateOne({ _id: req.params.id }, req.body)
        res.status(201).json({
            success: true,
            message: "Blog Updated Succesfully!",
            // async and await ma return garne tarika
            data: updatedBlog
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}) // update method

// to delete blog
router.delete('/blog/delete/:id', async function (req, res) {
    const id = req.params.id;
    try {
        await Blog.deleteOne({ _id: id })
        res.status(201).json({
            success: true,
            message: "Blog Deleted Succesfully!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
}
) // delete method


// to get blog by id
router.get('/blog/getById/:id', async function (req, res) {
    const id = req.params.id;
    try {
        const blogData = await Blog.findOne({ _id: id })
        res.status(200).json({
            success: true,
            data: blogData,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
}) // get blog by id

// to upload blog image
router.put('/blog/image/upload/:id', async function (req, res) {
    const id = req.params.id
    const blog = await Blog.findOne({ _id: id })
    try {
        console.log(req.files)
        const formImage = req.files.file
        const imagePath = formImage.tempFilePath
        const image = await cloudinary.uploader.upload(imagePath, {
            public_id: blog.blogName + Date.now(),
            folder: "Blog"
        })
        blog.blogImageUrl = image.secure_url
        await blog.save()
        res.status(201).json({
            success: true,
            message: "Blog Image upload successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
    res.end()
})

//exporting router
module.exports = router