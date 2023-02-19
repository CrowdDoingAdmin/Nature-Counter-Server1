const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');
const authenticate = require('../config/authenticate');
const NearParkController = require('../controllers/getParkController');
const nearParkRouter = express.Router();
// const cacheNearPark = require('../middleware/cacheNearPark');
nearParkRouter.use(bodyParser.json());


nearParkRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    // .get([cors.cors, cacheNearPark.getCached], NearParkController.getPark)
    .get([cors.cors], NearParkController.getPark)


module.exports = nearParkRouter;
