const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    icon:{
        //Contains path of the icon to the assets folder
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
})

const descriptionSchema = new Schema({
    description:{
        type: String,
        required: true
    },
    category:{
        type: [categorySchema]
    },
});

const timeBasedBenefitSchema = new Schema({
    time: {
        type: Number,
        required: true,
        min: 0,
        max:1000
    },
    benefit: {
        type: [descriptionSchema],
        required: true
    }
}, {
    timestamps: true
});


var timeBasedBenefits = mongoose.model('TimeBasedBenefit', timeBasedBenefitSchema);

module.exports = timeBasedBenefits;