//Servicio para generar un comprobante de orden con informacion de usuario y de la orden
const multer = require('multer');
const Order = require('../models/order.model').Order

const upload = multer({ dest: 'uploads/' });

async function createOrder(req, res) {
    const { order_number, user, equipment, time, price, status } = req.body;
    let file = req.file.path;

    try {
        const newOrder = await new Order({ order_number, user, equipment, time, price, status, file }).save();
        res.status(201).json({
            message: "Order successfully created",
            obj: newOrder
        });
    } catch (e) {
        res.status(500).json({
            error: e,
            message: "Error creating order"
        });
    }
}

// Get all orders
async function getAllOrders(req, res) {
    try {
        const orders = await Order.find({ deleted: false });
        res.status(200).json({
            message: "All orders",
            obj: orders
        });
    } catch (e) {
        res.status(500).json({
            error: e,
            message: "Can't get orders"
        });
    }
}

// Get order by ID
async function getOrderById(req, res) {
    const _id = req.params.orderId;
    try {
        const order = await Order.findOne({ _id: _id, deleted: false });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({
            message: "Order found",
            obj: order
        });
    } catch (e) {
        res.status(500).json({
            error: e,
            message: "Error getting order"
        });
    }
}

// Update an order
async function updateOrder(req, res) {
    const _id = req.params.orderId;
    const updateData = req.body;
    try {
        const order = await Order.updateOne({ _id: _id }, updateData);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({
            message: "Order successfully updated",
            obj: order
        });
    } catch (e) {
        res.status(500).json({
            error: e,
            message: "Error updating order"
        });
    }
}

// Logical delete of an order
async function changeDeleteStatus(req, res) {
    const _id = req.params.orderId;
    try {
        const order = await Order.findOne({ _id: _id });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.deleted = !order.deleted;
        await order.save();

        res.status(200).json({
            message: "Order delete status changed"
        });
    } catch (e) {
        res.status(500).json({
            error: e,
            message: "Error changing delete status of order"
        });
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    changeDeleteStatus,
    upload
}
