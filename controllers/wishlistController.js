const Wishlist = require('../models/Wishlist.js');

exports.add_new_wishlist = async function (req, res) {
    try {
        const productId = req.params.id
        const userId = req.user.id
        const inwishlist = await Wishlist.findOne({ productId, userId })
        if (inwishlist) {
            res.status(400).json({
                success: false,
                message: "Item Already in Wishlist!",
            })
        }
        else {
            const wishlist = new Wishlist({
                productId,
                userId
            })
            const saved = await wishlist.save()
            res.status(201).json({
                success: true,
                message: "Item Added to Wishlist!",
                data: saved,
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
} // add wishlist

exports.delete_wishlist = async function (req, res) {
    try {
        const productId = req.params.id
        const userId = req.user.id
        const response = await Wishlist.deleteOne({ productId, userId })
        if (response.deletedCount > 0) {
            res.status(201).json({
                success: true,
                message: "Wishlist Item Deleted Succesfully!"
            })
        }
        else {
            res.status(201).json({
                success: false,
                message: "Wishlist Item Not Deleted!"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
} // delete wishlist

exports.get_all_wishlist = async function (req, res) {
    try {
        const userId = req.user.id
        const wishlistsData = await Wishlist.find({ userId }).populate("userId productId")
        res.status(201).json({
            success: true,
            data: wishlistsData
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
} // fetch all wishlist