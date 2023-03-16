const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');
const authenticate = require('../config/authenticate');
const journalRouter = express.Router();
const journalController = require('../controllers/journalController');

journalRouter.use(bodyParser.json());

journalRouter.route('/:userId')
    .get(cors.cors,authenticate.verifyUser, journalController.getAllEntriesByUserId)
    .post(cors.corsWithOptions, authenticate.verifyUser,journalController.postEntries)
    .delete(cors.corsWithOptions,authenticate.verifyUser, journalController.deleteAllEntries);

journalRouter.route('/:userId/:entryId')
    .get(cors.cors,authenticate.verifyUser,journalController.getEntryById)
    .put(cors.corsWithOptions,authenticate.verifyUser,journalController.updateEntryById)
    .delete(cors.corsWithOptions,authenticate.verifyUser,journalController.deleteEntryById);

journalRouter.route('/:userId/date')
    .post(cors.cors,authenticate.verifyUser, journalController.getTotalHour);
    
    //api: journal/:userId/date
    //post body example, return total hours of being in nature from start_time to end_time
    // {

    //     "start_time": "2023-01-20T14:56:59.301Z",
    //     "end_time": "2023-01-27T15:56:59.301Z"

    // }
module.exports = journalRouter;
