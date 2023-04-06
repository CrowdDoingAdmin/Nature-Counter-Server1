const express = require("express");
const cors = require("./cors");
const authenticate = require("../config/authenticate");
const nonTimeBasedBenefitsRouter = express.Router();
const nonTimeBasedBenefitsController = require("../controllers/nonTimeBasedBenefitsController");

nonTimeBasedBenefitsRouter
  .route("/")
  .get(
    cors.cors,
    authenticate.verifyUser,
    nonTimeBasedBenefitsController.getNonTimeBasedBenefits
  );

module.exports = nonTimeBasedBenefitsRouter;
