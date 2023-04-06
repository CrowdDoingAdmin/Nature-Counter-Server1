const NonTimeBasedBenefitModel = require("../models/nonTimeBasedBenefitSchema");

/** data copied from the word document */
const nonTimeBasedBenefitsData = [
  {
    title: "Stress Reduction",
    benefits: [
      "Being in nature can reduce stress and fatigue. Being outdoors in nature has a much more calming effect than being indoors.",
      "If you are unable to be in nature, looking at photos of scenes in nature will also reduce stress and improve your mood.",
      "Parks are found to reduce stress and increase the feeling of support and connectedness.",
    ],
  },
  {
    title: "Sleep",
    benefits: [
      "A study concluded that people who live in neighborhoods near nature had a better quality of restorative, uninterrupted and deep sleep, lasting 6 hours or more.",
      "Men in the USA were studied and those who were in nature had a less likelihood of reporting sleep that was insufficient.",
      "A US study showed that in places that have more greenery and nature, residents reported a lowered level of depression symptoms.",
    ],
  },
  {
    title: "Reduced Anxiety",
    benefits: [
      "Neighborhoods with more green space were linked to lower levels of depression and anxiety.",
      "A New Zealand study showed that people ages 15 and over who lived closer to green space had a lower rate of mood disorders.",
    ],
  },
  {
    title: "Increased Sense of Happiness and Wellbeing",
    benefits: [
      "In one study, participants felt a higher level of emotional stability after being in nature.",
      "In a New Zealand study, people who had access to nature had a greater life satisfaction and felt happier.",
      "In the United Kingdom, people reported having the highest levels of well-being when in nature. ",
    ],
  },
  {
    title: "Increase Feelings of Connectedness and Social Support",
    benefits: [
      "In a New Orleans study, parks were perceived to have a 27% higher relationship between those who live and work in those areas.",
      "In a Dutch study, people living in or near greener areas felt more connected and socially supported.",
      "Those living or having access to greenery reported a lower level of stress and higher level of social cohesion and connectedness.",
    ],
  },
  {
    title: "Lowered Blood Pressure and Better Cardiovascular Health",
    benefits: [
      "In a Canadian study, residents living in neighborhoods with more trees had higher health perception and lowered risk of cardiovascular problems. ",
    ],
  },
  {
    title: "Reduced Obesity",
    benefits: [
      "In a two year study, children (ages 6-13) living in areas with more greenspace reported a lower body mass index.",
      "In a three year study in Melbourne, Australia, children ages 5-6 and 10-12 had lower body mass indexes after spending time outside.",
      "In a US study, adults living in NYC who lived in the zip code of a clean park had a lower BMI than those living near parks which weren’t as clean.",
    ],
  },
  {
    title: "Improved Overall Health",
    benefits: [
      "The amount of greenery in proximity to someone’s home reduced the risk of diabetes by 14% and hypertension by 13% and greater overall health.",
      "In a Danish study, people living farther than 1 km away from nature had increased odds of being stressed, those living within walking distance of nature reported reduced stress.",
    ],
  },
];

/** pushes data from nonTimeBasedBenefitsData to the database
 * based on the NonTimeBasedBenefitModel
 */
async function populateDatabase() {
  const benefitsDocumentArray = [];

  for (let i = 0; i < nonTimeBasedBenefitsData.length; i++) {
    const benefitTitle = nonTimeBasedBenefitsData[i].title;
    const benefitsArray = nonTimeBasedBenefitsData[i].benefits;
    for (let y = 0; y < benefitsArray.length; y++) {
      benefitsDocumentArray.push({
        benefit: benefitTitle,
        description: benefitsArray[y],
      });
    }
  }

  const savedData = await NonTimeBasedBenefitModel.insertMany([
    ...benefitsDocumentArray,
  ]);

  console.log(savedData);
}

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
