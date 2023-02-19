const mongoose = require('mongoose');
const createError = require('http-errors');
const UserGoal = require('../models/goalSchema');

module.exports = {
    GetAllGoal: async (req, res, next) => {
        try {
            const goal = await UserGoal.find();
            res.json(goal);
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    },
    AddNewGoal: async (req, res, next) => {
        console.log(req.body.goalDetail.goalId);
        try {
            const chkGoal = await UserGoal.findOne({ uid: req.body.uid, 'goalDetail.goalId': req.body.goalDetail.goalId });
            if (chkGoal) {
                const updatedGoal = await UserGoal.updateOne(
                    { uid: req.body.uid, 'goalDetail.goalId': req.body.goalDetail.goalId },
                    { $set: { 'goalDetail.$.goalTime': req.body.goalDetail.goalTime } },
                    { upsert: true }
                );
                res.json(updatedGoal);
            }
            const user = await UserGoal.findOne({ uid: req.body.uid, 'goalDetail.status': true });
            if (user) {
                await UserGoal.updateOne(
                    { uid: req.body.uid, 'goalDetail.status': true },
                    { $set: { 'goalDetail.$.status': false } },
                    { upsert: true }
                );
            }

            const goal = await UserGoal.updateOne(
                { uid: req.body.uid },
                { $addToSet: { 'goalDetail': req.body.goalDetail } },
                { upsert: true, new: true }
            );
            if (!goal) {
                const newgoal = new UserGoal(req.body);
                await newgoal.save();
            } else {
                res.json(goal);
            }
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    },
    UpdateGoalById: async (req, res, next) => {
        id = req.params.goalId
        try {
            const goal = await UserGoal.updateOne(
                { uid: req.body.uid, 'goalDetail.goalId': id },
                { $set: { 'goalDetail.$.goalTime': req.body.goalTime } },
                { upsert: true }
            );
            res.json(goal);
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    },
    AddandUpdateActivity: async (req, res, next) => {
        try {
            console.log(JSON.stringify(req.body))
            const goalId = req.params.goalId;
            const userId = req.body.uid;
            const activityId = req.params.activityId;
            const timeReq = req.body.dailyActivity.timeLog;
            const symptomReq = req.body.dailyActivity.symptoms;
            const user = await UserGoal.findOne({ 'goalDetail.goalId': goalId, 'goalDetail.dailyActivity.activityId': activityId }, { 'goalDetail.$': 1 });
            if (user == null) {
                await UserGoal.updateOne(
                    {
                        uid: userId, 'goalDetail.goalId': goalId
                    },
                    {
                        $addToSet: {
                            'goalDetail.$.dailyActivity': req.body.dailyActivity
                        }
                    }, {
                    upsert: true
                }, function (err, docs) {
                    res.json(docs);
                });
            }
            else if (user !== null) {
                console.log(user.goalDetail[0].dailyActivity.length)
                if (symptomReq) {
                    /*await UserGoal.updateOne({ uid: userId },
                        [{
                            $match: {
                                symptoms: "goalDetail.$[i].dailyActivity.$[j].symptoms"
                            }
                        }, {
                            $replaceWith: req.body.dailyActivity.symptoms,
                        }], {
                        arrayFilters: [
                            { 'i.goalId': goalId }, { 'j.activityId': activityId }
                        ], upsert: true, new: true
                    }, function (err, docs) {
                        console.log(docs);
                        res.json(docs);
                    })*/
                    await UserGoal.updateOne({ uid: userId },
                        {
                            $pull: {
                                "goalDetail.$[i].dailyActivity.$[j].symptoms": {}
                            },
                        }, {
                        arrayFilters: [
                            { 'i.goalId': goalId }, { 'j.activityId': activityId }
                        ], upsert: true, new: true
                    }, function (err, docs) {
                        console.log(docs);
                        UserGoal.updateOne({ uid: userId },
                            {
                                $push: {
                                    "goalDetail.$[i].dailyActivity.$[j].symptoms": req.body.dailyActivity.symptoms
                                },
                            }, {
                            arrayFilters: [
                                { 'i.goalId': goalId }, { 'j.activityId': activityId }
                            ], upsert: true, new: true
                        }, function (err, docs) {
                            console.log(docs);
                            res.json(docs);
                        })
                    });
                }
                else if (timeReq) {
                    UserGoal.updateOne({ uid: userId }, {
                        $inc: {
                            "goalDetail.$[i].dailyActivity.$[j].timeLog.mapTime": timeReq.mapTime,
                            "goalDetail.$[i].dailyActivity.$[j].timeLog.timerTime": timeReq.timerTime,
                            "goalDetail.$[i].dailyActivity.$[j].timeLog.textTime": timeReq.textTime
                        },
                    }, {
                        arrayFilters: [{
                            'i.goalId': goalId
                        }, {
                            'j.activityId': activityId
                        }],
                        upsert: true, new: true
                    }, function (err, docs) {
                        res.json(docs);
                    });
                }
            }
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    },
}
