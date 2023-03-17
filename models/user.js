const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserV1 = new Schema({
    email: {
        type: String,
        required: [true, 'Email required'],
        unique: true
    },
    firebaseId: {
        type: String,
        required: [true, 'Firebase ID required'],
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


const UserDetail = mongoose.model("UserDetails", UserV1);
module.exports = UserDetail;
