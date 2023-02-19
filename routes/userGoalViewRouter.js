const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');
const authenticate = require('../config/authenticate');
const userDetailViewRouter = express.Router();

const userGoalViewController = require('../controllers/userGoalViewController');
userDetailViewRouter.use(bodyParser.json());

userDetailViewRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, userGoalViewController.getAllGoals);

userDetailViewRouter.route('/:goalId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, userGoalViewController.getGoalById);

module.exports = userDetailViewRouter;
