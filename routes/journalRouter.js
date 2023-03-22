const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');
const authenticate = require('../config/authenticate');
const journalRouter = express.Router();
const journalController = require('../controllers/journalController');

journalRouter.use(bodyParser.json());

journalRouter.route('/')
.delete(cors.corsWithOptions, authenticate.verifyUser, journalController.deleteAllEntries);

journalRouter.route('/allentries')
.get(cors.cors, authenticate.verifyUser, journalController.getAllEntriesByUserId)

journalRouter.route('/singleentry')
    .get(cors.cors, authenticate.verifyUser, journalController.getEntryById)
    .post(cors.corsWithOptions, authenticate.verifyUser, journalController.postEntries)
    .put(cors.corsWithOptions, authenticate.verifyUser, journalController.updateEntryById)
    .delete(cors.corsWithOptions, authenticate.verifyUser, journalController.deleteEntryById);

journalRouter.route('/date')
    .post(cors.cors,authenticate.verifyUser,journalController.getTotalHour);
module.exports = journalRouter;
