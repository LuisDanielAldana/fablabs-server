const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const UserSchema = new mongoose.Schema(
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
        lastname: {
            type: String,
            required: true,
            default: null
        },
        // Role of the user, could be student, administrative or teacher
        role: {
            type: String,
            required: true,
            default: "Student"
        }
    }
);


const User = mongoose.model('User',UserSchema);

module.exports = {
    User
}
