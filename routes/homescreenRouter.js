const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');
const authenticate = require('../config/authenticate');
const homescreenRouter = express.Router();

const homescreenController = require('../controllers/homescreenController');
const journalController = require('../controllers/journalController');

homescreenRouter.use(bodyParser.json());



homescreenRouter.route('/')
    .options(cors.corsWithOptions, authenticate.verifyUser, (req, res) => { res.sendStatus(200); })
    .post(cors.cors,authenticate.verifyUser,journalController.postEntries)
    .get(cors.cors,authenticate.verifyUser,homescreenController.getStopwatch);

homescreenRouter.route('/date')
    .post(cors.cors,authenticate.verifyUser,journalController.getWeeklySummary)
        //api: home/date/?firebaseId=
    //post body example, return durations for everyday between start_time and end_time
    // {

    //     "start_time": "2023-01-20T14:56:59.301Z",
    //     "end_time": "2023-01-27T15:56:59.301Z"

    // }
    
module.exports = homescreenRouter;

