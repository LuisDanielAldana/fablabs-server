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
        duration: {
            type: Number,
            required: true,
            default: null
        },
        scheduled_date:{
            type: Date,
            required: true,
            default: null
        },
        price: {
            type: Number,
            required: true,
            default: null
        },
        status: {
            type: String,
            required: true,
            default: null
        },
        file: {
          type: String,
          required: true,
          default: null
        },
        deleted: {
            type: Boolean,
            required: true,
            default: false
        },
        created: {
            type: Date,
            default: Date.now
        }
    }
);



const Order = mongoose.model('Order',OrderSchema);

module.exports = {
    Order
}
