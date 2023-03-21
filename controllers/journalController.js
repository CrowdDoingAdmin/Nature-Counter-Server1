const mongoose = require('mongoose');
const createError = require('http-errors');
const Journal = require('../models/journalSchema');

module.exports = {
    getAllEntriesByUserId: async (req, res, next) => {
        try {
            const id = req.query.firebase_id;
            if (id){
                const entries = await Journal.find({ firebaseId: id });
                res.json(entries);
            }
        } catch (err) {
            res.status(404).json(err);
            next(err)
        }
    },
    postEntries: async (req, res, next) => {
        try {
            const newEntry = new Journal(req.body);
            const savedEntry = await newEntry.save();
            res.json(savedEntry);
        } catch (err) {
            res.status(404).json(err);
            next(err)
        }
    },
    deleteAllEntries: async (req, res, next) => {
        try {
            const deletedEntries = await Journal.deleteMany({});
            res.json(deletedEntries);
        } catch (err) {
            res.status(404).json(err);
            next(err)
        }
    },
    getEntryById: async (req, res, next) => {
        const journalId = req.query.journal_id;
        try {
            const entry = await Journal.findById(journalId);
            if (!entry) {
                throw createError(404, 'Entry does not exits');
            } else {
                res.json(entry);
            }
        } catch (err) {
            res.status(404).json(err);
            next(err)
        }
    },
    updateEntryById: async (req, res, next) => {
        const journalId = req.query.journal_id;
        try {
            const entry = await Journal.findByIdAndUpdate(journalId, {
                $set: req.body
            }, { new: true });
            if (!entry) {
                throw createError(404, 'Entry does not exits');
            } else {
                res.json(entry);
            }
        } catch (err) {
            res.status(404).json(err);
            next(err)
        }
    },
    deleteEntryById: async (req, res, next) => {
        const journalId = req.query.journal_id;
        try {
            const deletedEntry = await Journal.findByIdAndRemove(journalId);
            res.json(deletedEntry);
        } catch (err) {
            res.status(404).json(err);
            next(err)
        }
    },
    getTotalHour: async (req, res, next) => {
        try {
            
            const id = req.params.userId;
            const startDate = req.body.start_time;
            const endDate = req.body.end_time;
            if (id){
                // const entries = await Journal.find({start_time: {$gte: startDate, $lte: endDate}});
                const entries = await Journal.aggregate([
                    {$match:{userId: new mongoose.Types.ObjectId(id)}},
                    {$match:{start_time: {$gte: new Date(startDate), $lte: new Date(endDate)}}},
                    {$project:{userId: "$userId", duration: {$divide: [{$subtract: ["$end_time", "$start_time"]}, 1000]}}},
                    {$group: {_id: "$userId", totalMin: {$sum : "$duration"}}}


                ]);

                res.json(entries);

            }
        } catch (err) {
            res.status(404).json(err);
            next(err)
        }
    },

    getWeeklySummary: async (req, res, next) => {
        const totalMin = 0;
        try {
            
            const id = req.params.userId;cd
            const startDate = req.body.start_time;
            const endDate = req.body.end_time;
            if (id){
                // const entries = await Journal.find({start_time: {$gte: startDate, $lte: endDate}});
                const entries = await Journal.aggregate([
                    {$match:{userId: new mongoose.Types.ObjectId(id)}},
                    {$match:{start_time: {$gte: new Date(startDate), $lte: new Date(endDate)}}},
                    {$project:{userId: "$userId", start_time:"$start_time",duration: {$divide: [{$subtract: ["$end_time", "$start_time"]}, 1000]}}},
                    


                ]);

                res.json(entries);

            }
        } catch (err) {
            res.status(404).json(err);
            next(err)
        }
    },
}

