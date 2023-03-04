const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    email: {
        type: String,
        required: [true, 'Email required'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Name required'],
    },
    gender: {
        type: String,
        required: [true, 'Gender required'],
    },
    dob: {
        type: Date,
    },
    weekly_goal: {
        type: Number,
        max: [10080, 'Time exceeds amount of minutes per week']
    },
    admin: {
        type: Boolean,
        default: false,
    },
    userAgreementTAC: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});


const UserDetail = mongoose.model("UserDetails", User);
module.exports = UserDetail;
