// DO NOT USE

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');
const authenticate = require('../config/authenticate');
const healthCategoryRouter = express.Router();

const healthCategorytController = require('../controllers/healthCategoryController');
healthCategoryRouter.use(bodyParser.json());

healthCategoryRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, healthCategorytController.getAllHealthCategories);


module.exports = healthCategoryRouter;
