// DO NOT USE

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');
const authenticate = require('../config/authenticate');
const symptomRouter = express.Router();

const SymptomController = require('../controllers/symptomController');
symptomRouter.use(bodyParser.json());

symptomRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, SymptomController.getAllSymptoms)
    .post(cors.corsWithOptions, authenticate.verifyUser, SymptomController.postSymptoms)
    .delete(cors.corsWithOptions, authenticate.verifyUser, SymptomController.deleteAllSymptoms);

symptomRouter.route('/:symptomId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, SymptomController.getSymptomById)
    .put(cors.corsWithOptions, authenticate.verifyUser, SymptomController.updateSymptomById)
    .delete(cors.corsWithOptions, authenticate.verifyUser, SymptomController.deleteSymptomById);

module.exports = symptomRouter;
