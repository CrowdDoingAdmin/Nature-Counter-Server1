/* 
- Testing Framework: Jest
- Make sure to start the server on docker before running tests.
*/

const axios = require('axios');
require("dotenv").config()
jest.setTimeout(10000);

let baseUrl = 'http://localhost:8080/favoriteLoc';
let config;
let token;
let tempLocId;
let user_id = "63d0956442696f004aaa5d27";
let body = {
    "location": "central park"
};

beforeAll(callback => {
    var data = JSON.stringify({
        "email": process.env.TEST_USERNAME,
        "password": process.env.TEST_PASSWORD,
        "returnSecureToken": true
    });

    var tokenConfig = {
        method: 'post',
        url: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.FIREBASE_KEY}`,
        headers: {
            'Origin': '1',
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(tokenConfig)
        .then(function (response) {
            if (response.data && response.data.idToken) {
                token = response.data.idToken;

                config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                done();
            }
        })
        .catch(function (error) {
            console.log('ERROR:', error);
            callback();
        });
});


describe('---- testing favorite location functionality ----', () => {

    it('Add location.  POST route should return 200 and the object added', async () => {
        let response = await axios.post(baseUrl + '/' + user_id, body, config);

        expect(response.status).toBe(200);
        expect(Object.values(response.data)).toContain(body.location);

        tempLocId = response.data["_id"];
    });

    it('Get all user\'s location.  GET all favorite locations route should return 200 and pull in all locations', async () => {
        let response = await axios.get(baseUrl + '/' + user_id, config);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.data)).toBe(true);
        expect(response.data.length).toBeGreaterThanOrEqual(1);
    });

    it('Get user\'s location by location id.  GET one favorite location route should return 200 and pull in one location', async () => {
        let response = await axios.get(baseUrl + '/' + user_id + '/' + tempLocId, config);

        expect(response.status).toBe(200);
        expect(typeof response.data === 'object').toBe(true);
        expect(Object.values(response.data)).toContain(body.location);
    });

    it('DELETE specific favorite location should delete that specifc location, return 200, and return the deleted location data', async () => {
        let response = await axios.delete(baseUrl + '/' + user_id + '/' + tempLocId, config);

        expect(response.status).toBe(200);
        expect(Object.values(response.data)).toContain(body.location);
    });
});


