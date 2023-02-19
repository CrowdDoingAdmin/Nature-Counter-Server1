const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');
const authenticate = require('../config/authenticate');
const favoriteLocRouter = express.Router();

const FavoriteLocController = require('../controllers/favoriteLocController');
favoriteLocRouter.use(bodyParser.json());

favoriteLocRouter.route('/:userId')
    .get(cors.cors, authenticate.verifyUser, FavoriteLocController.getAllLocations)
    .post(cors.corsWithOptions, authenticate.verifyUser, FavoriteLocController.addLocation)
    .delete(cors.corsWithOptions, authenticate.verifyUser, FavoriteLocController.removeLocation);

favoriteLocRouter.route('/:userId/:locId')
    .get(cors.cors, authenticate.verifyUser, FavoriteLocController.getLocationById)
    .delete(cors.corsWithOptions, authenticate.verifyUser, FavoriteLocController.removeLocationById);


module.exports = favoriteLocRouter;
