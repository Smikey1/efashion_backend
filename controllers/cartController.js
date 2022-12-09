const Cart = require('../models/Cart');

exports.add_new_cart = async function (req, res) {
    try {
        const productId = req.params.id
        const userId =  req.user.id
        const inCart = await Cart.findOne({productId, userId})
        if(inCart){
            res.status(400).json({
                success:false,
                message: "Item Already in Cart!",
            })
        }
        else{
            const cart = new Cart({
                productId,
                userId
            })
            const saved = await cart.save()
            res.status(201).json({
                success:true,
                message: "Item added cart!",
                data:saved,
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
} // add cart

exports.update_cart = async function (req, res) {
    try {
        const productId = req.params.id
        const userId =  req.user.id
        let updatedcart=await Cart.updateOne({productId, userId}, {quantity:req.params.quantity},{new:true})

        res.status(201).json({
            success:true,
            message: "Quantity Updated Succesfully!",
            // async and await ma return garne tarika
            data:updatedcart,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
} //update cart

exports.delete_cart = async function (req, res) {
    try {
        const productId = req.params.id
        const userId =  req.user.id
        const response = await Cart.deleteOne({productId, userId})
        if(response.deletedCount > 0){
            res.status(201).json({
                success:true,
                message: "Item Deleted Succesfully!"
            })
        }
        else{
            res.status(201).json({
                    success:false,
                    message: "This item is not in cart!"
                })
        }
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
} // delete cart

exports.get_all_cart = async function (req, res) {
    try {
        // userko id auth bata aaune
        const userId =  req.user.id
        const cartsData = await Cart.find({userId}).populate("productId")
        res.status(201).json({
            success:true,
            data: cartsData
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
} // fetch all cart