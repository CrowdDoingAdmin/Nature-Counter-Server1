const mongoose = require('mongoose');
const createError = require('http-errors');
const HomeScreen = require('../models/homescreenSchema');

module.exports = {
    createStopwatch: async (req, res, next) => {
        const id = req.body.uid;
        try {
            const stopwatch = await HomeScreen.findOne({ uid: id });
            if (stopwatch) {
                const user = await HomeScreen.findOneAndUpdate({ uid: id }, {
                    $set: req.body
                }, { new: true });
                res.json(user);
            } else {
                const newStopWatch = new HomeScreen(req.body);
                const saveStopWatch = await newStopWatch.save(); 
                res.json(saveStopWatch)
            }     
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    },

    getStopwatch: async (req, res, next) => {
        const id = req.params.uid;
        try {
            console.log(id);
            const stopwatch = await HomeScreen.findOne({ uid: id });
            if (!stopwatch) {
                throw createError(404, 'User does not exits');
            } else {
                res.json(stopwatch);
            }     
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    }
}