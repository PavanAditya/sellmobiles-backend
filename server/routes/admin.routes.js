const express = require('express');
const router = express.Router();
const {
    adminControllers
} = require('../controllers/admin.controllers');

// ! Get All User Details
//  http://localhost:3000/api/v1/admin/registered-users
router.get('/registered-users', adminControllers.getRegisteredUsers);

// ! Get Total Number Of User Details
//  http://localhost:3000/api/v1/admin/count-registered-users
router.get('/count-registered-users', adminControllers.getRegisteredUsersCount);

// ! Get All Online User Details
//  http://localhost:3000/api/v1/admin/online-users
router.get('/online-users', adminControllers.getOnlineUsers);

// ! Get All Online User Details
//  http://localhost:3000/api/v1/admin/count-online-users
router.get('/count-online-users', adminControllers.getOnlineUsersCount);

// ! Get Top Liked Post
//  http://localhost:3000/api/v1/admin/top-liked-posts
router.get('/top-liked-posts', adminControllers.getLikedPosts);

// ! Get Total Number Of Posts
//  http://localhost:3000/api/v1/admin/total-posts
router.get('/total-posts', adminControllers.getPostsCount);

// ! Get Total Number Of Posts
//  http://localhost:3000/api/v1/admin/sold-mobiles-count
router.get('/sold-mobiles-count', adminControllers.getMobilesSoldCount);

// ! Delete User Details
//  http://localhost:3000/api/v1/admin/delete-post/:_id
router.delete('/delete-post/:_id',adminControllers.deleteUserPost);

// ! Get Number Count Of All Mobile Brands
//  http://localhost:3000/api/v1/admin/mobiles-count
router.get('/mobiles-count', adminControllers.getMobilesCount);

// ! Get Number Count Of Likes On All Mobile Brands
//  http://localhost:3000/api/v1/admin/mobiles-likes-count
router.get('/mobiles-likes-count', adminControllers.getMobilesLikesCount);

// ! Get Number Count Of All Mobile Brands Based On Location
//  http://localhost:3000/api/v1/admin/mobiles-location-count
router.get('/mobiles-location-count', adminControllers.getLocationCount);

const adminRoute = router;

module.exports = {
    adminRoute: adminRoute
};