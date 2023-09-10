const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const MaterialSchema = new mongoose.Schema(
    {
        material: {
            type: String,
            required: true,
            default: null
        },
        image: {
          type: String,
          default: null
        },
        // Amount charged for using the material
        price: {
            type: Number,
            required: true,
            default: null
        }
    }
)

const EquipmentSchema = new mongoose.Schema(
    {
        registration_number:{
            type: String,
            required: true,
            default: null
        },
        name: {
            type: String,
            required: true,
            default: null
        },
        image: {
            type: String,
            default: null
        },
        // Amount charged for usage time
        price: {
            type: Number,
            required: true,
            default: null
        },
        available: {
            type: Boolean,
            default: true
        },
        material: {
            type: [MaterialSchema],
            default: null
        },
        deleted: {
            type: Boolean,
            default: false
        },
        created: {
            type: Date,
            default: Date.now
        }
    }
);


const Equipment = mongoose.model('Equipment',EquipmentSchema);

module.exports = {
    Equipment
}
