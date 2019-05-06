const express = require('express');
const authControllers = require('../controllers/auth.controllers');
const {
    auth
} = require('../middleware/auth');
const router = express.Router();
// ! signup route
// http://localhost:3000/api/v1/auth/signup
router.post('/signup', authControllers.signUp);

// ! Signin route
//  http://localhost:3000/api/v1/auth/signin
router.post('/signin', authControllers.signIn);

// !  Logout route
//  http://localhost:3000/api/v1/auth/logout
router.post('/logout', auth, authControllers.logOut);

// ! Forgot Password route
//  http://localhost:3000/api/v1/auth/forgotpassword
router.post('/forgotpassword', authControllers.forgotPassword);

 // ! reset password route
 //  http://localhost:3000/api/v1/auth/resetpassword
router.put('/resetpassword', authControllers.resetPassword);


const authRoute = router;

module.exports = {
    authRoute: authRoute
};
