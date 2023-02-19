const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');
const authenticate = require('../config/authenticate');
const userRouter = express.Router();

const UserController = require('../controllers/userController');
userRouter.use(bodyParser.json());

userRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    //.get(cors.cors, authenticate.verifyUser, UserController.getAllUsers)
    .post(cors.corsWithOptions, authenticate.verifyUser, UserController.postUser)
    //.delete(cors.corsWithOptions, authenticate.verifyUser, UserController.deleteAllUsers);

userRouter.route('/:userId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, UserController.getUserById)
    .put(cors.corsWithOptions, authenticate.verifyUser, UserController.updateUserById)
    .delete(cors.corsWithOptions, authenticate.verifyUser, UserController.deleteUserById);

module.exports = userRouter;
