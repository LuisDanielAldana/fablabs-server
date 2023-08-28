const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const ServiceSchema = new mongoose.Schema(
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
            required: true,
            default: null
        }
    }
);


const Service = mongoose.model('Service',ServiceSchema);

module.exports = {
    Service
}
