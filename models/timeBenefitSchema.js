const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeBasedBenefitSchema = new Schema({
    icon: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true,
        min: 0,
        max:1000
    },
    description: {
        type: [String],
        required: true
    }
}, {
    timestamps: true
});


var timeBasedBenefits = mongoose.model('TimeBasedBenefit', timeBasedBenefitSchema);

module.exports = timeBasedBenefits;