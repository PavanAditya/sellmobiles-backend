const express = require('express');
const passport = require('passport');
const authControllers = require('../controllers/auth.controllers');
const router = express.Router();

// ! github login
//  http://localhost:3000/api/v1/passport/github
router.route('/github').get(passport.authenticate('github', {
    scope: ['email']
}));

// ! google login
//  http://localhost:3000/api/v1/passport/google
router.route('/google')
    .get(passport.authenticate('google', {
        scope: [
            'profile',
            'email'
        ]
    }));

// ! pasport login failure
//  http://localhost:3000/api/v1/passport/failure
router.route('/failure').get((req, resp) => {
    resp.redirect('https://sellmobile-wtjan2019-dev-client.azurewebsites.net/');
    // resp.redirect('http://localhost:4200/login');
});

// ! generate auth token for google login
//  http://localhost:3000/api/v1/passport/google/callback
router.route('/google/callback')
    .get(passport.authenticate('google', {
        failureRedirect: '/failure'
    }), authControllers.generateAuthToken);

// ! generate auth token for github login
//  http://localhost:3000/api/v1/passport/github/callback
router.route('/github/callback')
    .get(passport.authenticate('github', {
        failureRedirect: '/failure'
    }), authControllers.generateAuthToken);

const passportRoute = router;

module.exports = {
    passportRoute: passportRoute
};
