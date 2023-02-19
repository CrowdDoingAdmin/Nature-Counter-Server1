const queryOverpass = require('@derhuerst/query-overpass')
const geolib = require('geolib');
// const cacheNearPark = require('../middleware/cacheNearPark');

//const HealthCategories = require('../models/healthCategorySchema');

module.exports = {
    //get near park within 5 miles radius from given coordinate.
    getPark: async (req, res, next) => {
        const { lat, long } = req.query;
        // console.log('lat: '+lat);
        try {

            const query = `[out:json];
            (
              way
                  ["name"]
                [leisure~"park|beach_resort"]
                (around:8046.72,${lat},${long});
            );
            
            out bb;`

            const geoJSON = await queryOverpass(query)
                .then((data) => {
                    //const parsed = JSON.parse(data);
                    const calcDistance = data.map((item) => {
                        const distance = geolib.getDistance({ lat: lat, lon: long }, { lat: item.bounds.minlat, lon: item.bounds.minlon })
                        return { lat: item.bounds.minlat, lon: item.bounds.minlon, distance: geolib.convertDistance(distance, 'mi'), tags: item.tags }
                    })
                    //console.log('clearData :'+clearData)
                    const ordered = calcDistance.sort((a, b) => a.distance - b.distance)
                    // cacheNearPark.caching(`${lat}_${long}`, ordered);
                    res.send(ordered)
                })
                .catch(console.error)
            // console.log(geoJSON)


        } catch (err) {
            console.log(err.message);
            next(err)
        }
    },
}