const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const ServiceSchema = new mongoose.Schema(
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
        description: {
            type: String,
            required: true,
            default: null
        },
        image: {
            type: String,
            default: null
        },
        // id's of the equipment available for this service
        equipment: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Equipment",
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


const Service = mongoose.model('Service',ServiceSchema);

module.exports = {
    Service
}
