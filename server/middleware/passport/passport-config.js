const passport = require('passport');
const {
    passportGoogleStrategy
} = require('./google.strategy');
const {
    passportGithubStrategy
} = require('./github.strategy');

const passportConfig = function (app) {
    app.use(passport.initialize());

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    // ! function call for google passport login
    passportGoogleStrategy();

    // ! function call for github passport login
    passportGithubStrategy();
};

module.exports = {
    passportConfig: passportConfig
};