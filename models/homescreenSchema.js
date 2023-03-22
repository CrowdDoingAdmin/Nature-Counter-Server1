const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HomeScreenSchema = new Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },

    stopwatch: [{
        _id: {
            type: String, 
            required:true, 
            unique:true
        },
        start_time: {
            type: Date
        },
        end_time: {
            type: Date
        },
        // duration: {
        //     type: Number
        // },

    }],

    location: {
        type: String,
    },



    
}, {
    timestamps: true
});


var HomeScreen = mongoose.model('HomeScreen', HomeScreenSchema);

module.exports = HomeScreen;