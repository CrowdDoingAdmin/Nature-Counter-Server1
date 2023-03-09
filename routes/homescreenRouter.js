const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');
const authenticate = require('../config/authenticate');
const homescreenRouter = express.Router();

const homescreenController = require('../controllers/homescreenController');
const journalController = require('../controllers/journalController');

homescreenRouter.use(bodyParser.json());



homescreenRouter.route('/:uid')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .post(cors.cors,authenticate.verifyUser,journalController.postEntries)
    .get(cors.cors,authenticate.verifyUser,homescreenController.getStopwatch);

homescreenRouter.route('/:userId/date')
    .post(cors.cors,authenticate.verifyUser,journalController.getWeeklySummary)
    
module.exports = homescreenRouter;

