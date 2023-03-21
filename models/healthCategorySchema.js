// DO NOT USE

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const healthCategorySchema = new Schema({
    benefitCategory: {
        type: String,
        required: true,
        unique: true
    },
    id:{
        type: Number,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: false
});

var HealthCategories = mongoose.model('HealthCategories', healthCategorySchema);

module.exports = HealthCategories;