const joi = require('joi');

// ! validation for signUp
const joiSchemaForSignUpForm = joi.object().keys({
    password: joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$/),
    confirmPassword: joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$/),
    firstName: joi.string().regex(/^[a-zA-Z]+$/),
    lastName: joi.string().regex(/^[a-zA-Z]+$/),
    mobileNumber: joi.string().regex(/^[0-9]{10}$/),
    location: joi.string().regex(/^[a-zA-Z]+$/),
    email: joi.string().regex(/^[\w\.?]+@\w+\.(com|net|edu)$/)
});
const schemaForSignUpForm = (req) => joi.validate({
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    location: req.body.location,
    mobileNumber: req.body.mobileNumber,
    email: req.body.email
}, joiSchemaForSignUpForm);


// ! validation for signIn
const joiSchemaForSignInForm = joi.object().keys({
    password: joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$/),
    email: joi.string().regex(/^[\w\.?]+@\w+\.(com|net|edu)$/)
});
const schemaForSignInForm = (req) => joi.validate({
    password: req.body.password,
    email: req.body.email
}, joiSchemaForSignInForm);

// ! validation for forgot password
const joiSchemaForForgotPassword = joi.object().keys({
    email: joi.string().regex(/^[\w\.?]+@\w+\.(com|net|edu)$/)
});
const schemaForForgotPassword = (req) => joi.validate({
    email: req.body.email
}, joiSchemaForForgotPassword);

// ! validation for reset password
const joiSchemaForResetPassword = joi.object().keys({
    password: joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$/),
    confirmPassword: joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$/),
});
const schemaForResetPassword = (req) => joi.validate({
    password: req.body.email,
    confirmPassword: req.body.confirmPassword
}, joiSchemaForResetPassword);

// ! validation for contactUs form
const joiSchemaForContactUs = joi.object().keys({
    firstName: joi.string().regex(/^[a-zA-Z]+$/),
    email: joi.string().regex(/^[\w\.?]+@\w+\.(com|net|edu)$/)
});
const schemaForContactUs= (req) => joi.validate({
    firstName: req.body.firstName,
    email: req.body.email
}, joiSchemaForContactUs);


// ! validation for postMobile form
const joiSchemaForMobileForm = joi.object().keys({
    primaryCamera: joi.number().integer().min(0).max(30),
    secondaryCamera: joi.number().integer().min(0).max(20),
    battery: joi.number().integer().min(1000).max(6000),
    price: joi.number().integer().min(1).max(100000),

});
const schemaForMobileForm = (req) => joi.validate({
    primaryCamera: req.body.primaryCamera,
    secondaryCamera: req.body.secondaryCamera,
    battery: req.body.battery,
    price: req.body.price,
}, joiSchemaForMobileForm);

// ! validation for myProfile 
const joiSchemaForMyProfile = joi.object().keys({
    firstName: joi.string().regex(/^[a-zA-Z]+$/),
    lastName: joi.string().regex(/^[a-zA-Z]+$/),
    mobileNumber: joi.string().regex(/^[0-9]{10}$/),
    location: joi.string().regex(/^[a-zA-Z]+$/),
});
const schemaForMyProfile= (req) => joi.validate({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mobileNumber: req.body.mobileNumber,
    location: req.body.location
}, joiSchemaForMyProfile);

module.exports = {
    schemaForSignUpForm,
    schemaForSignInForm,
    schemaForForgotPassword,
    schemaForResetPassword,
    schemaForContactUs,
    schemaForMobileForm,
    schemaForMyProfile
};

