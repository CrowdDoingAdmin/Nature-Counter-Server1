// DO NOT USE

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SymptomSchema= new Schema({
    symptom: {
        type: String,
        required: true,
        unique: true
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
}, { timestamps: false });

var Symptoms = mongoose.model('Symptom', SymptomSchema);

module.exports = Symptoms;