const mongoose = require('mongoose');
const createError = require('http-errors');
const FavoriteLocSchema = require('../models/favoriteLocSchema');

module.exports = {
    getAllLocations: async (req, res, next) => {
        try {
            const id = req.params.userId;
            const location = await FavoriteLocSchema.find({ userId: id });
            res.json(location);
        } catch (err) {
            console.log('ERROR:  ', err.message);
            res.status(404).json(err);
            next(err)
        }
    },
    addLocation: async (req, res, next) => {
        try {
            const id = req.params.userId;
            const loc = req.body.location;
            const newLocation = new FavoriteLocSchema({
                location: loc,
                userId: id
            });
            const savedLocation = await newLocation.save();
            res.json(savedLocation);
        } catch (err) {
            console.log('ERROR:  ', err);
            res.status(404).json(err);
            next(err)
        }
    },
    removeLocation: async (req, res, next) => {
        try {
            const delLoc = await FavoriteLocSchema.deleteMany({});
            res.json(delLoc);
        } catch (err) {
            console.log('ERROR:  ', err);
            res.status(404).json(err);
            next(err)
        }
    },
    getLocationById: async (req, res, next) => {
        const id = req.params.locId;
        try {
            const location = await FavoriteLocSchema.findById(id);
            if (!location) {
                throw createError(404, 'Location not found.');
            } else {
                res.json(location);
            }
        } catch (err) {
            console.log('ERROR:  ', err);
            res.status(404).json(err);
            next(err)
        }
    },
    removeLocationById: async (req, res, next) => {
        const id = req.params.locId;
        try {
            const location = await FavoriteLocSchema.findByIdAndRemove(id)

            if (!location) {
                throw createError(404, 'Location not found.');
            } else {
                res.json(location);
            }
        } catch (err) {
            console.log('ERROR:  ', err);
            res.status(404).json(err);
            next(err)
        }
    }
}