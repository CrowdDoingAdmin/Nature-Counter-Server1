const NonTimeBasedBenefitModel = require("../models/nonTimeBasedBenefitSchema");

module.exports = {
  getNonTimeBasedBenefits: async (req, res, next) => {
    try {
      const benefits = await NonTimeBasedBenefitModel.find({});
      res.json(benefits);
    } catch (err) {
      console.log(err.message);
      next(err);
    }
  },
};
