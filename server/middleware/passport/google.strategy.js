/* eslint-disable no-unused-vars */
const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const {
    formSchema
} = require('../../models/user.model');

const passportGoogleStrategy = () => {
    passport.use(new googleStrategy({
            clientID: '928380373537-qt2bjvhusp8guilu76ls6ul4mj54kdfm.apps.googleusercontent.com',
            clientSecret: '2KKN8EjYnTYM-AKUDNy7CBRr',
            // callbackURL: 'https://sellmobiles-wtjan2019-qa-api.azurewebsites.net/api/v1/auth/passport/google/callback'
            // callbackURL: 'https://sellmobiles.azurewebsites.net/api/v1/auth/passport/google/callback'
            callbackURL: 'http://sellmobiles.herokuapp.com/api/v1/auth/passport/google/callback'
            // callbackURL: 'http://localhost:3000/api/v1/auth/passport/google/callback'
        },
        (async (accessToken, refreshToken, profile, done) => {
            const userObject = await formSchema.findOne({
                'email': profile.emails[0].value
            });
            if (userObject) {
                return done(null, userObject);
            }

            const user = new formSchema({});
            const displayName = profile.displayName.split(' ');
            user.email = profile.emails[0].value;
            user.firstName = displayName[0];
            user.lastName = displayName[1];
            user.token = accessToken;
            user.loginMethod = 'google';
            user.online = 'Y';
            // user.socketId = '';
            user.userName = displayName[0] + Math.floor(Math.random() * Math.floor(9999));
            const saveUser = await user.save();
            if(!saveUser){
                done('error while saving');
            }
            done(null,user);
        })
    ));
};

module.exports = {
    passportGoogleStrategy: passportGoogleStrategy
};