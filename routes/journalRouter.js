const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');
const authenticate = require('../config/authenticate');
const journalRouter = express.Router();
const journalController = require('../controllers/journalController');

journalRouter.use(bodyParser.json());

journalRouter.route('/:userId')
    .get(cors.cors, journalController.getAllEntriesByUserId)
    .post(cors.corsWithOptions, authenticate.verifyUser,journalController.postEntries)
    .delete(cors.corsWithOptions,authenticate.verifyUser, journalController.deleteAllEntries);

journalRouter.route('/:userId/:entryId')
    .get(cors.cors,journalController.getEntryById)
    .put(cors.corsWithOptions,authenticate.verifyUser,journalController.updateEntryById)
    .delete(cors.corsWithOptions,authenticate.verifyUser,journalController.deleteEntryById);

journalRouter.route('/:userId/date')
    .post(cors.cors,authenticate.verifyUser, journalController.getTotalHour);
    
module.exports = journalRouter;
