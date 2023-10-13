const mongoose = require('mongoose');
const {Schema} = require("mongoose");
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema(
    {
        registration_number: {
          type: String,
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
        email: {
          type: String,
          required: true,
          default: null
        },
        password: {
            type: String,
            required: true,
            default: null
        },
        // Role of the user, could be student, administrative or teacher
        role: {
            type: String,
            default: "Student"
        },
        credit: {
            type: Number,
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

UserSchema.pre("save", function (next) {
    const user = this

    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(10, function (saltError, salt) {
            if (saltError) {
                return next(saltError)
            } else {
                bcrypt.hash(user.password, salt, function(hashError, hash) {
                    if (hashError) {
                        return next(hashError)
                    }

                    user.password = hash
                    next()
                })
            }
        })
    } else {
        return next()
    }
})

UserSchema.methods.comparePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(error, isMatch) {
        if (error) {
            return callback(error)
        } else {
            callback(null, isMatch)
        }
    })
}


const User = mongoose.model('User',UserSchema);

module.exports = {
    User
}
