// DO NOT USE

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoalViewSchema = new Schema({
    uid: {
        type: String,
        required: true
    },
    CurrentNatureTime: {
        type: Number,
    },
    goalDetail: [{
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
                type: Date
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
                    type: String,
                    required: true
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

    }]
}, {
    timestamps: true,
    typePojoToMixed: false,
});

const UserGoalView = mongoose.model("user_goals_views", GoalViewSchema);
module.exports = UserGoalView;