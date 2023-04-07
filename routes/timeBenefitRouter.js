const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');
const authenticate = require('../config/authenticate');
const benefitRouter = express.Router();

const BenefitController = require('../controllers/timeBenefitController');
benefitRouter.use(bodyParser.json());

benefitRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser,BenefitController.getAllBenefits)

benefitRouter.route('/:time')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, BenefitController.getBenefitByTime)


module.exports = benefitRouter;
