const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');
const authenticate = require('../config/authenticate');
const userDetailViewRouter = express.Router();

const userDetailViewController = require('../controllers/userDetailViewController');
userDetailViewRouter.use(bodyParser.json());

userDetailViewRouter.route('/')
    //.get(cors.cors, authenticate.verifyUser, userDetailViewController.getAllUsers);
    .put(cors.cors, authenticate.verifyUser, userDetailViewController.updateUserById)
    .post(cors.corsWithOptions, authenticate.verifyUser, userDetailViewController.addUser)

userDetailViewRouter.route('/:userId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(authenticate.verifyUser, userDetailViewController.getUserById);


module.exports = userDetailViewRouter;
