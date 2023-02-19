const mongoose = require('mongoose');
const createError = require('http-errors');
const Symptoms = require('../models/symptomSchema');

module.exports = {
    getAllSymptoms: async (req, res, next) => {
        try {
            const symptom = await Symptoms.find(req.query);
            res.json(symptom);
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    },
    postSymptoms: async (req, res, next) => {
        try {
            const newSymptom = new Symptoms(req.body);
            const savedSymptom = await newSymptom.save();
            res.json(savedSymptom);
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    },
    deleteAllSymptoms: async (req, res, next) => {
        try {
            const delSymptom = await Symptoms.deleteMany({});
            res.json(delSymptom);
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    },
    getSymptomById: async (req, res, next) => {
        const id = req.params.symptomId;
        try {
            const symptom = await Symptoms.findById(id);
            if (!symptom) {
                throw createError(404, 'Symptom does not exits');
            } else {
                res.json(symptom);
            }
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    },
    updateSymptomById: async (req, res, next) => {
        const id = req.params.symptomId;
        try {
            const symptom = await Symptoms.findByIdAndUpdate(id, {
                $set: req.body
            }, { new: true });
            if (!symptom) {
                throw createError(404, 'Symptom does not exits');
            } else {
                res.json(symptom);
            }
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    },
    deleteSymptomById: async (req, res, next) => {
        const id = req.params.symptomId;
        try {
            const symptom = await Symptoms.findByIdAndRemove(id)
            res.json(symptom);
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    }
}