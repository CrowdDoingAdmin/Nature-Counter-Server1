const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');
const authenticate = require('../config/authenticate');
const userDetailViewRouter = express.Router();

const userDetailViewController = require('../controllers/userDetailViewController');
userDetailViewRouter.use(bodyParser.json());

userDetailViewRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    //.get(cors.cors, authenticate.verifyUser, userDetailViewController.getAllUsers);

userDetailViewRouter.route('/:userId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, userDetailViewController.getUserById);

module.exports = userDetailViewRouter;
