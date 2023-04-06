const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NonTimeBasedBenefitSchema = new Schema({
  benefit: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

var NonTimeBasedBenefits = mongoose.model(
  "NonTimeBasedBenefit",
  NonTimeBasedBenefitSchema
);

module.exports = NonTimeBasedBenefits;
