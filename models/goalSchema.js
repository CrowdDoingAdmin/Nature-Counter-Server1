const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Goal = new Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    goalDetail: [{
        goalId: {
            type: String,
            unique: true
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
                type: String,
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
                    type: String, 
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

//Goal.plugin(timeZone, { paths: ['timestamps','goalDetail.startDate', 'goalDetail.endDate', 'goalDetail.dailyActivity.date'] });
const UserGoal = mongoose.model("UserGoals", Goal);
module.exports = UserGoal;
