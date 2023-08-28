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
            Type: String,
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
        price: {
            type: Number,
            required: true,
            default: null
        },
        // id's of the equipment available for this service
        available: {
            type: Boolean,
            required: true,
            default: true
        },
        material: {
            type: [MaterialSchema],
            required: true,
            default: null
        }
    }
);


const Equipment = mongoose.model('Equipment',EquipmentSchema);

module.exports = {
    Equipment
}
