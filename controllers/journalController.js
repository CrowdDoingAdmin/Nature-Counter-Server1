const mongoose = require('mongoose');
const createError = require('http-errors');
const Journal = require('../models/journalSchema');

module.exports = {
    getAllEntriesByUserId: async (req, res, next) => {
        try {
            const id = req.params.userId;
            if (id){
                const entries = await Journal.find({ userId: id });
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
            console.log('1----');
            res.json(savedEntry);
        } catch (err) {
            console.log('ERROR: ', err);
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
        const id = req.params.entryId;
        try {
            const entry = await Journal.findById(id);
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
        const id = req.params.entryId;
        try {
            const entry = await Journal.findByIdAndUpdate(id, {
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
        const id = req.params.entryId;
        try {
            const deletedEntry = await Journal.findByIdAndRemove(id)
            res.json(deletedEntry);
        } catch (err) {
            res.status(404).json(err);
            next(err)
        }
    }
}