const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    gender: {
        type: String,
    },
    dob: {
        type: Date,
    },
    admin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});


const UserDetail = mongoose.model("UserDetails", User);
module.exports = UserDetail;
