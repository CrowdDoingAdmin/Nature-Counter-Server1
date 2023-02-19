const mongoose = require('mongoose');
const createError = require('http-errors');
const UserGoalView = require('../models/userGoalView');

module.exports = {
    getAllGoals: async (req, res, next) => {
        try {
            const user = await UserGoalView.find();
            res.json(user);
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    },
    getGoalById: async (req, res, next) => {
        const id = req.params.goalId;
        try {
            const goal = await UserGoalView.findOne({ uid: id });
            if (!goal) {
                console.log('User does not exit');
            } else if (goal.length === 0) {
                console.log('Goal does not exit');
            } else {
                console.log(JSON.stringify(goal, undefined, 2));
                res.json(goal);
            }
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    }
}