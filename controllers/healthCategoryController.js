const mongoose = require('mongoose');
const createError = require('http-errors');
const HealthCategories = require('../models/healthCategorySchema');

module.exports = {
    getAllHealthCategories: async (req, res, next) => {
        try {
            const benefit = await HealthCategories.find(req.query);
            res.json(benefit);
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    },
}