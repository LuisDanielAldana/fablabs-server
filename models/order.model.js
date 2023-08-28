const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        order_number:{
            Type: String,
            required: true,
            default: null
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            default: null
        },
        equipment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Equipment",
            required: true,
            default: null
        },
        time: {
            type: Number,
            required: true,
            default: null
        },
        price: {
            type: Number,
            required: true,
            default: null
        }
    }
);


const Order = mongoose.model('Order',OrderSchema);

module.exports = {
    Order
}
