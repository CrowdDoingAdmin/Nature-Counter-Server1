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
    }
}