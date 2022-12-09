const ProductModel = require('../models/Product');
const ReviewModel = require('../models/Review');
const cloudinary = require("cloudinary").v2

exports.add_new_product = async function (req, res) {
    try {
        const price = +req.body.productPrice
        const coupons = Math.floor(Math.random() * 6)
        const totalRating = Math.floor(Math.random() * (200 - 45 + 1)) + 45
        const averageRating = ((Math.random() * (4 - 2 + 1)) + 2).toFixed(1)
        const offerApplied = coupons * 5
        const productCuttedPrice = (100 + offerApplied) / 100 * price
        const productData = new ProductModel({
            productName: req.body.productName,
            productPrice: price,
            productShortDescription: req.body.productShortDescription,
            productCategory: req.body.productCategory,
            featureName: req.body.featureName,
            featureValue: req.body.featureValue,
            productDescription: req.body.productDescription,
            productOtherDetails: req.body.productOtherDetails,
            freeCoupons: coupons,
            productRating: averageRating,
            totalRating: totalRating,
            offerApplied: offerApplied,
            productCuttedPrice: productCuttedPrice,
        });
        const saved = await productData.save()
        res.status(201).json({
            message: "Product Inserted!",
            saved,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
} // add product

exports.update_product = async function (req, res) {
    const id1 = req.params.id;
    try {
        let updatedProduct = await ProductModel
            .updateOne({ _id: id1 }, req.body)
        res.status(201).json({
            success: true,
            message: "Product Updated Succesfully!",
            // async and await ma return garne tarika
            data: updatedProduct
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
} // update product

exports.delete_product = async function (req, res) {
    const id = req.params.id;
    try {
        await ProductModel.deleteOne({
            _id: id
        })
        res.status(201).json({
            success: true,
            message: "Product Deleted Succesfully!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
} // delete product

exports.get_all_product = async function (req, res) {
    try {
        const productData = await ProductModel.find()
        res.status(200).json({
            success: true,
            data: productData
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }

} // fetch all product

exports.update_product_images = async (req, res) => {
    console.log(req.files)
    const id = req.params.id
    const product = await ProductModel.findOne({ _id: id })
    try {
        const updateImage = [...product.productImageUrlList] // array ma basexa
        const formImage = req.files.image
        const imagePath = formImage.tempFilePath
        const image = await cloudinary.uploader.upload(imagePath, {
            public_id: product.productName + Date.now(),
            folder: "Products"
        })
        updateImage.push(image.secure_url)
        product.productImageUrlList = updateImage
        await product.save()
        res.status(200).json({
            success: true,
            message: "Product image upload successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error
        })
    }
    res.end()
} // update product images

exports.get_product_by_categoryName = async function (req, res) {
    try {
        const categoryName = req.params.categoryName
        let productData = await ProductModel.find({ productCategory: categoryName })
        console.log(productData)
        if (productData.length === 0) {
            productData = await ProductModel.find({ productCategory: "Home" })
        }
        console.log(productData)
        res.status(200).json({
            success: true,
            data: productData,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
} // get product by categoryName

exports.get_product_by_productName = async function (req, res) {
    const productName = req.params.productName;
    try {
        const productData = await ProductModel.findOne({ productName: productName })
        console.log(productData)
        res.status(200).json({
            success: true,
            data: productData,
            productId: productData._id
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
} // get product by productName

exports.get_product_by_searchProduct = async function (req, res) {
    try {
        const pattern = req.params.pattern
        const productData = await ProductModel.find({ productName: { $regex: pattern } })
        console.log(productData)
        res.status(200).json({
            success: true,
            data: productData,
            productId: productData._id
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
} // get product by productName

exports.get_product_by_id = async function (req, res) {
    const id = req.params.id;
    try {
        let singleProductData = await ProductModel.findOne({ _id: id })
        const reviews = await ReviewModel.find({ productId: id }).populate("userId").select("-productId")
        singleProductData = singleProductData.toObject()
        singleProductData["reviews"] = reviews
        res.status(200).json({
            success: true,
            singleProductData: singleProductData,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
} // get product by id

