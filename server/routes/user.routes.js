const express = require('express');
const router = express.Router();
const {
    userControllers
} = require('../controllers/user.controllers');
const {
    auth
} = require('../middleware/auth');

// ! Get All User Details
//  http://localhost:3000/api/v1/users/details/:username
router.get('/details/:username', userControllers.userDetails);

// ! Get All User Details
//  http://localhost:3000/api/v1/users/selected/details/:userid
router.get('/selected/details/:userid', userControllers.selectedUserDetails);

// ! Put New User Details
//  http://localhost:3000/api/v1/users/update
router.put('/update', auth, userControllers.updateUserDetails);

// ! Delete User Details
//  http://localhost:3000/api/v1/users/delete/:email
router.delete('/delete/:email',auth, userControllers.deleteUserDetails);

// ! contact us
//  http://localhost:3000/api/v1/users/feedback
router.post('/feedback', userControllers.contactUs);

const userRoute = router;

module.exports = {
    userRoute: userRoute
};
