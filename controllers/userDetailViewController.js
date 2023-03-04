const mongoose = require('mongoose');
const createError = require('http-errors');
const UserDetailView = require('../models/userDetailView');
const UserDetail = require('../models/user');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const user = await UserDetailView.find();
            res.json(user);
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    },
    getUserById: async (req, res, next) => {
        const id = req.params.userId;
        try {
                const user = await UserDetail.find({ _id: id });
                if (!user) {
                    throw createError(404, 'User does not exits');
                } else if (user.length > 1) {
                    throw createError(404, 'Multiple users found.');
                } else {
                    res.json(user);
                }
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    },
    addUser: async (req, res, next) => {
        const id = req.params.userId;
        const email = req.body.email;
        try {
            const user = await UserDetail.findOne({ email: email });
            if (user) {
                throw createError(404, 'Email already exits');
            } else {
                const newUser = new UserDetail(req.body);
                await newUser.save(); 
                res.json(newUser);
            }     
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    },
    updateUserById: async (req, res, next) => {
        const id = req.body._id;
        try {
                const user = await UserDetail.findByIdAndUpdate(id, {
                    $set: req.body
                }, { new: true });

                if (!user) {
                    throw createError(404, 'User does not exits');
                } else if (user.length > 1) {
                    throw createError(404, 'Multiple users found.');
                } else {
                    res.json(user);
                }
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    }
}