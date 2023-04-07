const mongoose = require('mongoose');
const createError = require('http-errors');
const timeBasedBenefits = require('../models/timeBenefitSchema');
// let benefits = require('./timeBenefits.json');

// function push_data(benefits){
//     for(let i=0; i< benefits.length;i++){
//         const newBenefit = new timeBasedBenefits(benefits[i]);
//         newBenefit.save(function(err, doc) {
//             if (err) return console.error(err);
//             console.log("Document inserted successfully!");
//         });
//     }
// }

function groupBenefits(benefits, time){
    let newBenefit = {
        time: time,
        description : []
    };
    for(let i=0; i< benefits.length;i++){
        newBenefit.description.push.apply(newBenefit.description, benefits[i].description);
    }

    return newBenefit
}

module.exports = {
    getAllBenefits: async (req, res, next) => {
        try {
            const benefit = await timeBasedBenefits.find({});    
            res.json(benefit);
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    },
    getBenefitByTime: async (req, res, next) => {
        const time = req.params.time;
        try {
            const benefit = await timeBasedBenefits.find({ "time": { $lte: time }});
            if (!benefit.length) {
                res.json(benefit)
                // throw createError(404, 'Benefit does not exits');
            } else {
                newBenefit = groupBenefits(benefit, time);
                res.json(newBenefit);
            }
        } catch (err) {
            console.log(err.message);
            next(err)
        }
    }
}