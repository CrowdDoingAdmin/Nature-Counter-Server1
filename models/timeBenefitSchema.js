const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const benefitSchema = new Schema({
    description:{
        type: String,
        required: true
    },
    time:{
        type: Number,
        required: true,
        min: 0,
        max:1000
    },
});

const timeBasedBenefitSchema = new Schema({
    categoryName:{
        type: String,
        required: true
    },
    icon:{
        type: String,
        required: true
    },
    benefits: {
        type: [benefitSchema],
        required: true
    }
}, {
    timestamps: true
});


var timeBasedBenefits = mongoose.model('TimeBasedBenefit', timeBasedBenefitSchema);

module.exports = timeBasedBenefits;