// DO NOT USE

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserViewSchema = new Schema({
    // uid: {
    //     type: String,
    //     required: true
    // },
    email: {
        type: String
    },
    name: {
        type: String,
    },
    CurrentNatureTime: {
        type: Number,
    },
    goalDetail: {
        goalId: {
            type: String
        },
        goalTime: {
            type: Number
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: Date,
        },
        status: {
            type: Boolean,
            default: true,
        },
        dailyActivity: [{
            activityId: {
                type: String
            },
            date: {
                type: String
            },
            timeLog: {
                mapTime: {
                    type: Number,
                    default: 0
                },
                timerTime: {
                    type: Number,
                    default: 0
                },
                textTime: {
                    type: Number,
                    default: 0
                }
            },
            symptoms: [{
                _id: {
                    type: String
                },
                symptom: {
                    type: String
                },
                icon: {
                    type: String,
                    required: true
                },
                level: {
                    type: Number,
                    min: 0,
                    max: 3,
                    default: 0
                }
            }]
        }]

    }
}, {
    timestamps: false,
    typePojoToMixed: false,
});

const UserDetailView = mongoose.model("user_details_views", UserViewSchema);
module.exports = UserDetailView;