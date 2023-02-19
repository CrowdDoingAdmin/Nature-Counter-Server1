/* 
- Testing Framework: Jest
- 

- Make sure to start the server on docker before running tests.

- Also make sure to update the bearer token.
*/

const axios = require('axios');
require("dotenv").config()
jest.setTimeout(10000);

let baseUrl = 'http://localhost:8080/journal/';
let config;
let token;
let tempPostId;
let user_id = "63d0956442696f004aaa5d27"
let body;

beforeAll(done => {
    // Clears the database and adds some testing data.
    // Jest will wait for this promise to resolve before running tests.
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
                body = {
                    location: "Central Park",
                    start_time: "2022-12-25T00:00:00.000Z",
                    end_time: "2023-01-01T00:00:00.000Z",
                    userId: user_id,
                }
                done();
            }
        })
        .catch(function (error) {
            console.log('ERROR:', error);
            done();
        });
});


describe('testing journal functionality', () => {

    it('POST route should return 200 and the object added', async () => {
        let response = await axios.post(baseUrl + user_id, body, config);

        expect(response.status).toBe(200);
        expect(Object.values(response.data)).toContain(body.location);
        expect(Object.values(response.data)).toContain(body.start_time);
        expect(Object.values(response.data)).toContain(body.end_time);

        tempPostId = response.data["_id"];
    });

    it('GET all journal post route should return 200 and pull in any posts', async () => {
        let response = await axios.get(baseUrl + user_id, config);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.data)).toBe(true);
        expect(response.data.length).toBeGreaterThanOrEqual(1);
    });

    it('GET one journal post route should return 200 and pull in any posts', async () => {
        let response = await axios.get(baseUrl + user_id + '/' + tempPostId, config);

        expect(response.status).toBe(200);
        expect(typeof response.data === 'object').toBe(true);
        expect(Object.values(response.data)).toContain(body.location);
        expect(Object.values(response.data)).toContain(body.start_time);
        expect(Object.values(response.data)).toContain(body.end_time);
    });

    it('DELETE specific journal post should delete that specifc post, return 200, and return the deleted post data', async () => {
        let response = await axios.delete(baseUrl + user_id + '/' + tempPostId, config);

        expect(response.status).toBe(200);
        expect(Object.values(response.data)).toContain(body.location);
        expect(Object.values(response.data)).toContain(body.start_time);
        expect(Object.values(response.data)).toContain(body.end_time);
    });
});


