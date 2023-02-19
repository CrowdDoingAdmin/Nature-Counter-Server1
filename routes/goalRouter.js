const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');
const authenticate = require('../config/authenticate');
const GoalController = require('../controllers/goalController')
const goalRouter = express.Router();

goalRouter.use(bodyParser.json());

goalRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => {res.sendStatus(200);})
    //.get(cors.corsWithOptions, authenticate.verifyUser, GoalController.GetAllGoal)
    .post(cors.corsWithOptions, authenticate.verifyUser, GoalController.AddNewGoal);

goalRouter.route('/:goalId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .put(cors.corsWithOptions, authenticate.verifyUser, GoalController.UpdateGoalById);

goalRouter.route('/:goalId/:activityId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .put(cors.corsWithOptions, authenticate.verifyUser, GoalController.AddandUpdateActivity);

module.exports = goalRouter;
