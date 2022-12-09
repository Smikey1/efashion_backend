const Order = require('../models/Order');

exports.add_new_order = async function (req, res) {
    try {
        const userId = req.user.id
        const placedOrder = req.body.order
        const order = new Order({ order: placedOrder, userId })
        const saved = await order.save()
        res.status(201).json({
            success: true,
            message: "Item added for order!",
            data: saved,
            latestOrderId: "" + saved._id + ""
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
} // add order

exports.update_order = async function (req, res) {
    try {
        const productId = req.params.id
        const userId = req.user.id
        let updatedorder = await Order.updateOne(
            { _id: productId },
            { deliveryDate: req.body.deliveryDate, deliveryStatusMessage: req.body.deliveryStatusMessage },
            { new: true })

        res.status(201).json({
            success: true,
            message: "Order Updated Succesfully!",
            // async and await ma return garne tarika
            data: updatedorder,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
} //update order

exports.delete_order = async function (req, res) {
    try {
        const orderId = req.params.id
        const response = await Order.deleteOne({ _id: orderId })
        if (response.deletedCount > 0) {
            res.status(201).json({
                success: true,
                message: "Item Deleted Succesfully!"
            })
        }
        else {
            res.status(201).json({
                success: false,
                message: "This item is not ordered!"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
} // delete order

exports.get_all_order = async function (req, res) {
    try {
        // userko id auth bata aaune
        const userId = req.user.id
        const ordersData = await Order.find({ userId }).populate("userId order.productId ")
        res.status(201).json({
            success: true,
            data: ordersData
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
} // fetch all order

exports.get_order_by_id = async function (req, res) {
    const id = req.params.id;
    try {
        const singleOrderData = await Order.findOne({ _id: id }).populate("order.productId")
        res.status(200).json({
            success: true,
            singleOrderData: singleOrderData,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
} // get order by id