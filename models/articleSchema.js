const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    category: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    subTitle: {
        type: String
    },
    image: {
        type: String,
        required: true
    },
    readTime: {
        type: Number,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


var Articles = mongoose.model('Article', articleSchema);

module.exports = Articles;