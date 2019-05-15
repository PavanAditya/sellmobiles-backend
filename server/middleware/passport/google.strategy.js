/* eslint-disable no-unused-vars */
const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const {
    formSchema
} = require('../../models/user.model');
const {
    transporter
} = require('../../helpers/mail-transporter');

const passportGoogleStrategy = () => {
    passport.use(new googleStrategy({
        clientID: '928380373537-qt2bjvhusp8guilu76ls6ul4mj54kdfm.apps.googleusercontent.com',
        clientSecret: '2KKN8EjYnTYM-AKUDNy7CBRr',
        // callbackURL: 'https://sellmobiles.herokuapp.com/api/v1/auth/passport/google/callback'
        callbackURL: 'https://sellmobiles.herokuapp.com/api/v1/auth/passport/google/callback'
        // callbackURL: 'http://localhost:3000/api/v1/auth/passport/google/callback'
    },
        async (accessToken, refreshToken, profile, done) => {
            const userObject = await formSchema.findOne({
                'email': profile.emails[0].value
            });
            if (userObject) {
                userObject.token = accessToken;
                userObject.tokens = userObject.tokens.concat({ token: accessToken });
                userObject.save();
                return done(null, userObject);
            }
            const user = new formSchema({});
            const displayName = profile.displayName.split(' ');
            user.email = profile.emails[0].value;
            user.firstName = displayName[0];
            user.lastName = displayName[1];
            user.token = accessToken;
            user.tokens = user.tokens.concat({ token: accessToken });
            user.loginMethod = 'google';
            user.online = 'Y';
            // user.socketId = '';
            user.userName = displayName[0] + Math.floor(Math.random() * Math.floor(9999));
            const saveUser = await user.save();
            if (!saveUser) {
                done('error while saving');
            }
            const mailOptions = {
                from: 'sellmobileteam@gmail.com',
                to: user.email,
                subject: 'Sign Up with Sell Mobiles',
                text: 'Succesfully registered with Sell Mobiles ',
                html: `Dear <b>${user.firstName},<b><br>

                <b>Thank you for registering with sell mobiles!<b> We have received your registration . Thank you!. If you need to make any changes to your contact information , you will need to email me with that request since your registration is now “locked”.
                
                You can find links to our Facebook  page below.<br>

                Thank you again for your registration. If you have any questions, please let us know!<br>
                
                Regards,<br>
                
                Sell Mobiles<br>
                Facebook: https://www.facebook.com/MindtreeLtd<br>
                (123) 456-7890<br>
                
                `
            };
            transporter.sendMail(mailOptions, (error) => {
                if (error) {
                    return error;
                }
            });
            done(null, user);
        }
    ));
};

module.exports = {
    passportGoogleStrategy: passportGoogleStrategy
};
