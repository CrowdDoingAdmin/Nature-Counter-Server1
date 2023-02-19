const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://nature-counter-9088b.firebaseio.com',
});


/*admin.initializeApp({
    credential: admin.credential.refreshToken(refreshToken),
    databaseURL: 'https://nature-counter-9088b.firebaseio.com'
});*/

async function decodeIDToken(req, res, next) {
    const header = req.headers.authorization;
    if (header !== 'Bearer null' && req.headers.authorization('Bearer')) {

        const idToken = req.headers.authorization.split('Bearer ')[1];

        try {
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            req['currentUser'] = decodedToken;
            //console.log(currentUser);
        } catch (err) {
            console.log(err);
        }
    }

    next();
}

module.exports = decodeIDToken;
