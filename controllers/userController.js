const mongoose = require('mongoose');
const createError = require('http-errors');
const UserDetail = require('../models/user');


module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const user = await UserDetail.find();
            res.json(user);
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    },
    postUser: async (req, res, next) => {
        const id = req.body.uid;
        try {
            const user = await UserDetail.findOne({ firebaseId: id });
            if (user) {
                throw createError(404, 'User already exits');
            } else {
                const newUser = new UserDetail(req.body);
                await newUser.save(); 
            }     
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    },
    deleteAllUsers: async (req, res, next) => {
        try {
            const delUser = await UserDetail.deleteMany({});
            res.json(delUser);
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    },
    getUserById: async (req, res, next) => {
        const id = req.params.userId;
        try {
            const user = await UserDetail.findOne({ firebaseId: id });
            if (!user) {
                throw createError(404, 'User does not exits');
            } else {
                res.json(user);
            }
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    },
    updateUserById: async (req, res, next) => {
        const id = req.params.userId;
        try {
            const user = await UserDetail.findOneAndUpdate({ firebaseId: id }, {
                $set: req.body
            }, { new: true });
            res.json(user);
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    },
    deleteUserById: async (req, res, next) => {
        const id = req.params.userId;
        try {
            const user = await UserDetail.findOneAndDelete({ firebaseId: id})
            res.json(user);
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    }
}