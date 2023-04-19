const mongoose = require("mongoose");
const NonTimeBasedBenefitModel = require("../models/nonTimeBasedBenefitSchema");

module.exports = {
  getAllNonTimeBasedBenefits: async (req, res, next) => {
    try {
      const benefits = await NonTimeBasedBenefitModel.aggregate([
        {
          $group: {
            _id: null,
            benefits: { $push: "$description" },
          },
        },
        {
          $project: {
            _id: 0,
            category: "non time based benefits",
            benefits: "$benefits",
          },
        },
      ]);
      res.json(benefits[0]);
    } catch (err) {
      console.log(err.message);
      next(err);
    }
  },
  getOneNonTimeBasedBenefit: async (req, res, next) => {
    const { id } = req.body;

    try {
      const benefit = await NonTimeBasedBenefitModel.aggregate([
        {
          $match: {
            _id: id
              ? {
                  $nin: [mongoose.Types.ObjectId(String(id))],
                }
              : { $exists: true },
          },
        },
        {
          $sample: { size: 1 },
        },
        {
          $project: {
            category: "non time based benefits",
            benefit: "$description",
          },
        },
      ]);
      res.json(benefit[0]);
    } catch (err) {
      console.log(err.message);
      next(err);
    }
  },
};
