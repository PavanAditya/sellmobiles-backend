const {
    formSchema
} = require('../models/user.model');

const {
    transporter
} = require('../helpers/mail-transporter');


const joiValidators = require('../helpers/joi.validation');

// eslint-disable-next-line no-undef
email = '';
//! login as an existing user
const signIn = async (req, res, next) => {
    const {
        error,
        value
    } = joiValidators.schemaForSignInForm(req);

    if (error) {
        const errorObj = new Error('Request body Validation of Schema failed');
        errorObj.status = 500;
        errorObj.message = error;
        next(errorObj);
        return;
    }
    try {
        const user = await formSchema.findByCredentials(req.body.email, req.body.password);
        if (user === false) {
            res.status(401).send({
                message: 'Email or Password is incorrect!',
                data: '',
                status: 401
            });
            return;
        }
        if (!user) {
            res.status(500).send({
                message: 'No User Found',
                data: '',
                status: 500
            });
            return;
        }
        //! we used user instead of User because token will be generated for particular user but not for the whole User model.
        const result = await user.generateAuthToken();
        if (!result) {
            res.status(500).send({
                message: 'User not authenticated ! ',
                data: '',
                status: 500
            });
            return;
        }
        res.status(200).send({
            data: result.token,
            username: result.user.firstName,
            userid: result.user._id,
            status: 200,
            message: 'success'
        });
    } catch (err) {
        res.status(500).send({
            message: 'Bad Request ',
            data: err,
            status: 500
        });
    }

};

// !register a new user

const signUp = async (req, res, next) => {

    const {
        error,
        value
    } = joiValidators.schemaForSignUpForm(req);

    if (error) {
        const errorObj = new Error('Request body Validation of Schema failed');
        errorObj.status = 500;
        errorObj.message = error;
        next(errorObj);
        return;
    }

    if (req.body.password === req.body.confirmPassword) {
        // ! checking whether email id is present or not
        const userEmail = req.body.email;
        const user = new formSchema(req.body);
        try {
            const findUserByUserEmail = await formSchema.findOne({
                email: userEmail
            });
            if (findUserByUserEmail) {
                res.status(401).json({
                    message: 'You are Already Registered !',
                    data: '',
                    status: 401
                });
                return;
            }
            user.userName = user.firstName + Math.floor(Math.random() * Math.floor(9999));
            user.loginMethod = 'local';
            const newUser = await user.save();
            if (!newUser) {
                res.status(401).json({
                    message: 'Bad Request',
                    data: '',
                    status: 500
                });
                return;
            }
            const firstName = newUser.firstName;

            //! For sending mail
            const mailOptions = {
                from: 'sellmobileteam@gmail.com',
                to: newUser.email,
                subject: 'signUp with sellMobiles',
                text: 'succesfully registered with sell mobiles ',
                html: `Dear <b>${firstName},<b><br>

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
            res.status(200).json({
                data: user,
                status: 200,
                message: 'success'
            });
        } catch (err) {
            res.status(500).json({
                message: 'Bad request',
                data: '',
                status: 500
            });
        }
    } else {
        res.status(401).json({
            message: 'Password Invalid',
            data: '',
            status: 401
        });
    }
};

// ! logout of the regular login account
const logOut = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        req.user.online = 'N';
        const logoutUser = await req.user.save();
        if (!logoutUser) {
            res.status(500).send({
                message: 'Bad Request ',
                data: '',
                status: 500
            });
            return;
        }
        res.status(200).json({
            data: req.user,
            status: 200,
            message: 'success'
        });
    } catch (err) {
        res.status(500).send({
            message: 'Bad Request',
            data: err,
            status: 500
        });
    }

};

// ! generates the auth token for the passport login
const generateAuthToken = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            res.status(200);
            // await res.redirect(`http://localhost:4200?authtoken=${req.user.tokens[0].token}`);
            await res.redirect(`https://sellmobiles.pavanaditya.com?authtoken=${req.user.tokens[0].token}`);
        }
    } catch (err) {
        res.status(500).json({
            message: 'User not authenticated',
            status: 500,
            data: ''
        });
    }
};

const forgotPassword = async (req, res, next) => {

    const {
        error,
        value
    } = joiValidators.schemaForForgotPassword(req);
    if (error) {
        const errorObj = new Error('Request body Validation of Schema failed');
        errorObj.status = 500;
        errorObj.message = error;
        next(errorObj);
        return;
    }
    try {
        const userForgotPassword = await formSchema.findOne({
            email: req.body.email
        });
        if (!userForgotPassword) {
            res.status(500).json({
                message: 'Sorry Email not found !',
                data: '',
                status: 500
            });
        }
        const tokens = await userForgotPassword.generateAuthToken();
        const firstName = userForgotPassword.firstName;
        this.email = req.body.email;
        var mailOptions = {
            from: 'sellmobileteam@gmail.com',
            to: userForgotPassword.email,
            subject: 'Password recovery details- sellMobiles',
            text: `click this to reset your password : <a href="https://sellmobiles.pavanaditya.com/resetpassword">reset</a>`,

            html: `Dear <b>${firstName},</b>  <br>
                    <b>click this to reset your password : <a href="https://sellmobiles.pavanaditya.com/resetpassword/${tokens.token}">reset</a></b>
                    <p>If this is not you please ignore, your account is safe</p><br>
                
                Regards,<br>
                
                Sell Mobiles<br>
                Facebook: https://www.facebook.com/MindtreeLtd<br>
                (123) 456-7890<br>`
        };


        transporter.sendMail(mailOptions, (error) => {
            if (error) {

                return error;
            }

        });

        res.status(200).json({
            data: '',
            status: 200,
            message: 'successfully sent email to user'
        });

    } catch (err) {
        res.status(500).json({
            message: 'Bad request ',
            data: '',
            status: 500
        });
    }

};

const resetPassword = async (req, res, next) => {
    const {
        error,
        value
    } = joiValidators.schemaForResetPassword(req);

    if (error) {

        const errorObj = new Error('Request body Validation of Schema failed');
        errorObj.status = 500;
        errorObj.message = error;
        next(errorObj);

        return;
    }
    try {
        if (req.body.password === req.body.confirmPassword) {
            const resetPasswordForUser = await formSchema.findOne({
                email: this.email
            });
            if (!resetPasswordForUser) {
                res.status(500).json({
                    message: 'Bad request',
                    data: '',
                    status: 500
                });
                return;
            }


            resetPasswordForUser.password = req.body.password;
            resetPasswordForUser.confirmPassword = req.body.confirmPassword;
            resetPasswordForUser.tokens = [];
            const user = await resetPasswordForUser.save();
            this.email = '';
            if (!user) {
                res.status(500).json({
                    message: 'Bad request',
                    data: '',
                    status: 500
                });
                return;
            }
            res.status(200).json({
                data: 'user',
                status: 200,
                message: 'success'
            });

        }
    } catch (err) {
        res.status(500).send({
            status: 500,
            message: 'success',
            data: ''
        });
    }

};


module.exports = {
    signIn,
    signUp,
    logOut,
    generateAuthToken,
    forgotPassword,
    resetPassword
};
