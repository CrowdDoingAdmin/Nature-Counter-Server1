const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    category: {
        type: String,
        required: [true, 'Category required'],
    },
    title: {
        type: String,
        required: [true, 'Title required'],
        unique: true
    },
    subTitle: {
        type: String
    },
    author: {
        type: String,
    },
    image: {
        type: String,
    },
    readTime: {
        type: Number,
        required: [true, 'Read time required'],
    },
    featured: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: [true, 'Description required'],
    },
    archived: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});


var Articles = mongoose.model('Article', articleSchema);

module.exports = Articles;