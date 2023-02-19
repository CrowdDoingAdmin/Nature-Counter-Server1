const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const benefitSchema = new Schema({
    benefit: {
        type: String,
        required: true,
        unique: true
    },
    icon: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    gainTime: {
        type: Number,
        required: true,
        min: 0,
        max:1000
    },
    healthCategoryId: {
        type: Number,
        default: 3,
    },
    dailyGainTime: {
        type: Number,
        default: 10,
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


var Benefits = mongoose.model('Benefit', benefitSchema);

module.exports = Benefits;