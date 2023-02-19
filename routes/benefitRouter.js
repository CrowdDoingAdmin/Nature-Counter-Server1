const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');
const authenticate = require('../config/authenticate');
const benefitRouter = express.Router();

const BenefitController = require('../controllers/benefitController');
benefitRouter.use(bodyParser.json());

benefitRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, BenefitController.getAllBenefits)
    .post(cors.corsWithOptions, authenticate.verifyUser, BenefitController.postBenefits)
    .delete(cors.corsWithOptions, authenticate.verifyUser, BenefitController.deleteAllBenefits);

benefitRouter.route('/:benefitId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, BenefitController.getBenefitById)
    .put(cors.corsWithOptions, authenticate.verifyUser, BenefitController.updateBenefitById)
    .delete(cors.corsWithOptions, authenticate.verifyUser, BenefitController.deleteBenefitById);


module.exports = benefitRouter;
