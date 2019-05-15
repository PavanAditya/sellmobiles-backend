const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const {
    formSchema
} = require('../../models/user.model');

const passportGithubStrategy = () => {
    passport.use(new GitHubStrategy({
            clientID: '6484968203fb83109ff6',
            clientSecret: '7b8a61a60932de73cde7301d93bc5bf1666a958c',
            // callbackURL: 'http://localhost:3000/api/v1/auth/passport/github/callback'
            // callbackURL: 'https://sellmobiles.herokuapp.com/api/v1/auth/passport/github/callback'
            callbackURL: 'http://sellmobiles.herokuapp.com/api/v1/auth/passport/github/callback'
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
            user.loginMethod = 'github';
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
    passportGithubStrategy: passportGithubStrategy
};
