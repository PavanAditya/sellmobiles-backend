const express = require('express');
const router = express.Router();
const mobileControllers = require('../controllers/mobile.controllers');
const filerControllers = require('../controllers/filter.controllers');
const {
    auth
} = require('../middleware/auth');

// ! get mobiles based on the city name
//  http://localhost:3000/api/v1/mobiles/city
router.route('/city').post(mobileControllers.getCity);

// ! get mobiles based on brand name
//  http://localhost:3000/api/v1/mobiles/brands
router.route('/brands').post(mobileControllers.getSearchBrand);

// ! add mobile to database
//  http://localhost:3000/api/v1/mobiles/new
router.route('/new').post(auth, mobileControllers.addMobile);

// ! Edit price field at description page
//  http://localhost:3000/api/v1/mobiles/update/:id
router.route('/mobiles/update/:id').put(auth, mobileControllers.updateMobilePrice);

// ! fetch mobiles list from database
//  http://localhost:3000/api/v1/mobiles/list
router.route('/list').get(mobileControllers.mobileList);

// ! get brands and models array for display the drop down
//  http://localhost:3000/api/v1/mobiles/names
router.route('/names').get(mobileControllers.getBrands);

// ! delete mobile
//  http://localhost:3000/api/v1/mobiles/deletemobile/:id
router.route('/deletemobile/:id').delete(auth, mobileControllers.deleteMobile);

// ! update sold mobile
//  http://localhost:3000/api/v1/mobiles/updatesoldmobile/:id
router.route('/updatesoldmobile/:id').put(auth, mobileControllers.updateSoldMobile);

// ! toggling the like
//  http://localhost:3000/api/v1/mobiles/wishlist
router.route('/wishlist').put(auth, mobileControllers.toggleLike);

// ! apply filters on search result
//  http://localhost:3000/api/v1/mobiles/filter/:filterquery
router.route('/filter/:filterquery').get(filerControllers.filterSearch);

// ! mobile description
//  http://localhost:3000/api/v1/mobiles/description/:id
router.route('/description/:id').get(mobileControllers.mobileDescription);

//  http://localhost:3000/api/v1/mobiles/boughtMobiles/:buyerName
router.route('/boughtMobiles/:buyerName').get(auth, mobileControllers.boughtMobiles);

//  http://localhost:3000/api/v1/mobiles/soldMobiles/:userName
router.route('/soldMobiles/:userName').get(auth, mobileControllers.soldMobiles);

module.exports = {
    mobileRoute: router
};