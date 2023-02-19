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
           // setTimeout(() => {
                const user = await UserDetailView.findOne({ uid: id });
                if (!user) {
                    const newuser = await UserDetail.findOne({ uid: id });
                    if (!newuser) {
                        throw createError(404, 'User does not exits');
                    } else {
                        res.json(newuser);
                    }
                } else if (user.length === 0) {
                    console.log('User Active Goal does not exit');
                } else {
                    console.log(user);
                    res.json(user);
                }
           // }, 400)
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    }
}