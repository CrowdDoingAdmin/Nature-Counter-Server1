const mongoose = require('mongoose');
const createError = require('http-errors');
const Benefits = require('../models/benefitSchema');

module.exports = {
    getAllBenefits: async (req, res, next) => {
        try {
            const benefit = await Benefits.find(req.query);
            res.json(benefit);
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    },
    postBenefits: async (req, res, next) => {
        try {
            const newBenefit = new Benefits(req.body);
            const savedBenefit = await newBenefit.save();
            res.json(savedBenefit);
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    },
    deleteAllBenefits: async (req, res, next) => {
        try {
            const delBenefit = await Benefits.deleteMany({});
            res.json(delBenefit);
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    },
    getBenefitById: async (req, res, next) => {
        const id = req.params.benefitId;
        try {
            const benefit = await Benefits.findById(id);
            if (!benefit) {
                throw createError(404, 'Benefit does not exits');
            } else {
                res.json(benefit);
            }
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    },
    updateBenefitById: async (req, res, next) => {
        const id = req.params.benefitId;
        try {
            const benefit = await Benefits.findByIdAndUpdate(id, {
                $set: req.body
            }, { new: true });
            if (!benefit) {
                throw createError(404, 'Benefit does not exits');
            } else {
                res.json(benefit);
            }
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    },
    deleteBenefitById: async (req, res, next) => {
        const id = req.params.benefitId;
        try {
            const benefit = await Benefits.findByIdAndRemove(id)
            res.json(benefit);
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    }
}