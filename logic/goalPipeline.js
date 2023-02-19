const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const Goal = require('../models/goalSchema');

db = db.getSiblingDB("natureCounterDb");
db.getCollection("userdetails").aggregate(
    [
        {
            "$lookup": {
                "from": "usergoals",
                "let": {
                    "uid": "$uid",
                    "status": true
                },
                "pipeline": [
                    {
                        "$match": {
                            "$expr": {
                                "$and": [
                                    {
                                        "$eq": [
                                            "$$uid",
                                            "$uid"
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                ],
                "as": "currentGoal"
            }
        },
        {
            "$replaceRoot": {
                "newRoot": {
                    "$mergeObjects": [
                        {
                            "$arrayElemAt": [
                                "$currentGoal",
                                0.0
                            ]
                        },
                        "$$ROOT"
                    ]
                }
            }
        },
        {
            "$project": {
                "name": 1.0,
                "uid": 1.0,
                "email": 1.0,
                "goalDetail": {
                    "$filter": {
                        "input": "$goalDetail",
                        "as": "goal",
                        "cond": {
                            "$eq": [
                                "$$goal.status",
                                true
                            ]
                        }
                    }
                }
            }
        },
        {
            "$unwind": {
                "path": "$goalDetail"
            }
        },
        {
            "$group": {
                "_id": {
                    "name": "$name",
                    "uid": "$uid",
                    "email": "$email",
                    "totalMapTime": {
                        "$sum": "$goalDetail.dailyActivity.timeLog.mapTime"
                    },
                    "totalTimerTime": {
                        "$sum": "$goalDetail.dailyActivity.timeLog.timerTime"
                    },
                    "totaltextTime": {
                        "$sum": "$goalDetail.dailyActivity.timeLog.textTime"
                    },
                    "goalDetail": "$goalDetail"
                }
            }
        },
        {
            "$project": {
                "name": "$_id.name",
                "uid": "$_id.uid",
                "email": "$_id.email",
                "CurrentNatureTime": {
                    "$add": [
                        "$_id.totalMapTime",
                        "$_id.totalTimerTime",
                        "$_id.totaltextTime"
                    ]
                },
                "goalDetail": "$_id.goalDetail",
                "_id": 0.0
            }
        },
        {
            "$out": "user"
        }
    ],
    {
        "allowDiskUse": false
    }
);
