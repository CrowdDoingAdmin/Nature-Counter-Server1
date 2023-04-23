const mongoose = require('mongoose');
const createError = require('http-errors');
const timeBasedBenefits = require('../models/timeBenefitSchema');
// let benefits = require('./timeBenefits.json');

// function push_data(benefits){
//     for(let i=0; i< benefits.length;i++){
//         const newBenefit = new timeBasedBenefits(benefits[i]);
//         newBenefit.save(function(err, doc) {
//             if (err) return console.error(err);
//             console.log(`Inserted benefit with time ${benefits[i].time}`);
//         });
//     }
// }

module.exports = {
    getAllBenefits: async (req, res, next) => {
        try {
            const benefit = await timeBasedBenefits.find({});
            // push_data(benefits);
            res.json(benefit);
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    }
    // getBenefitByTime: async (req, res, next) => {
    //     const time = req.params.time;
    //     try {
    //         const benefit = await timeBasedBenefits.find({ "time": { $lte: time }});
    //         res.json(benefit);
    //     } catch (err) {
    //         console.log(err.message);
    //         next(err)
    //     }
    // }
}