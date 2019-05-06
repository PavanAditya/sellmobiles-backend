const {
    brandSchema
} = require('../models/brand.model.js');
const {
    mobile
} = require('../models/mobile.model');

// ! for fetching the mobiles list from db
const mobileList = async (req, res) => {
    try {
        const mobileList = await mobile.find({});
        if (!mobileList) {
            res.json({
                message: 'Bad Request',
                data: '',
                status: 500
            });
            return;
        }
        res.json({
            message: 'mobiles List Fetched',
            data: mobileList,
            status: 200
        });

    } catch (err) {
        res.json({
            message: 'Bad Request',
            data: err,
            status: 500
        });
    }

};

const deleteMobile = async (req, res) => {
    try {
        const postId = req.params.id;
        const mobileDescription = await mobile.findByIdAndDelete(postId);
        if (!mobileDescription) {
            res.status(500).send({
                message: 'Bad Request',
                data: '',
                status: 500
            });
            return;
        }
        res.status(200).send({
            message: 'successfully deleted the phone',
            data: mobileDescription,
            status: 200
        });

    } catch (err) {
        res.status(500).send({
            message: 'Bad Request',
            data: err,
            status: 500
        });
    }

};

const toggleLike = async (req, res) => {
    try {
        const mobileDetails = await mobile.findByIdAndUpdate(req.body._id, {
            likedBy: req.body.likedBy
        }, { new: true });
        if (!mobileDetails) {
            res.status(500).send({
                message: 'Bad Request',
                data: '',
                status: 500
            });
            return;
        }
        res.status(200).send({
            message: 'success',
            data: mobileDetails,
            status: 200
        });
    } catch (err) {
        res.status(500).send({
            message: 'Bad Request of Like update',
            data: err,
            status: 500
        });
    }
};

// ! for editing price field on description page
const updateMobilePrice = async (req, res) => {
    try {
        const mobilePrice = await mobile.findByIdAndUpdate(req.params.id, {
            price: req.body.price
        }, { new: true } );
        if (!mobilePrice) {
            res.status(500).send({
                message: 'Bad Request',
                data: '',
                status: 500
            });
            return;
        }
        if(mobilePrice){
            res.status(200).send({
                message: 'success',
                data: mobilePrice,
                status: 200
            });
        }

    } catch (err) {
        res.status(500).send({
            message: 'Bad Request of User details',
            data: err,
            status: 500
        });
    }
};
// ! for adding mobile into a db
const addMobile = async (req, res) => {

    try {
        const mobileData = new mobile(req.body);
        mobileData.buyerUserName = '';
        const newMobile = await mobileData.save();
        if (!newMobile) {
            res.status(500).send({
                message: 'Bad Request',
                data: '',
                status: 500
            });
            return;
        }
        res.status(200).send({
            message: 'mobiles List added',
            data: newMobile,
            status: 200
        });
    } catch (err) {
        res.status(500).send({
            message: 'Bad Request',
            data: err,
            status: 500
        });
    }

};

// ! for fetching mobile details of single mobile for mobile description page
const mobileDescription = async (req, res) => {
    try {
        const mobileDescriptions = await mobile.findById({ _id: req.params.id });
        if (!mobileDescriptions) {
            res.status(500).json({
                message: 'Bad Request',
                data: '',
                status: 500
            });
            return;
        }
        res.status(200).json({
            message: 'mobiles deatails Fetched',
            data: mobileDescriptions,
            status: 200
        });

    } catch (err) {
        res.status(500).json({
            message: 'Bad Request',
            data: '',
            status: 500
        });
        return;
    }

};


// ! for getting the brand and model details from the db for drop down display
const getBrands = async (req, res) => {
    try {
        const mobileBrand = await brandSchema.find({});
        if (!mobileBrand) {
            res.status(500).send({
                message: 'Bad Request',
                data: '',
                status: 500
            });
            return;
        }
        res.status(200).send({
            message: 'success',
            data: mobileBrand,
            status: 200
        });
    } catch (err) {
        res.status(500).send({
            message: 'Bad Request',
            data: err,
            status: 500
        });
    }

};

// ! fetches list of cities
const getCity = async (req, res) => {
    try {
        if (req.body[0] === 'India') {
            const mobileList = await mobile.find({});

            if (!mobileList) {
                res.status(500).send({
                    message: 'No Data Found',
                    data: '',
                    status: 500
                });
                return;
            }
            res.status(200).send({
                message: 'success',
                data: mobileList,
                status: 200
            });
        } else {
            const mobileList = await mobile.find({
                location: req.body[0]
            });

            if (!mobileList) {
                res.status(500).send({
                    message: 'Bad Request',
                    data: '',
                    status: 500
                });
                return;
            }
            res.status(200).send({
                message: 'success',
                data: mobileList,
                status: 200
            });
        }
    } catch (err) {
        res.status(500).send({
            message: 'Bad Request Error',
            data: err,
            status: 500
        });
    }
};

// ! search by brand name
const getSearchBrand = async (req, res) => {
    try {
        if (req.body[0] === 'India') {
            const mobileList = await mobile.find({
                brand: req.body[1]
            });

            if (!mobileList) {
                res.status(500).send({
                    message: 'Bad Request',
                    data: '',
                    status: 500
                });
                return;
            }
            res.status(200).send({
                message: 'success',
                data: mobileList,
                status: 200
            });
        } else {
            const mobileList = await mobile.find({
                $and: [{
                    location: req.body[0]
                }, {
                    brand: req.body[1]
                }]
            });
            if (!mobileList) {
                res.status(500).send({
                    message: 'Bad Request',
                    data: '',
                    status: 500
                });
                return;
            }
            res.status(200).send({
                message: 'success',
                data: mobileList,
                status: 200
            });
        }
    } catch (err) {
        res.status(500).send({
            message: 'Bad Request',
            data: err,
            status: 500
        });
    }
};

const updateSoldMobile = async (req, res) => {
    try {
        const updatedMobilesList = await mobile.findByIdAndUpdate(req.params.id, {
            buyerUserName: req.body.buyerUserName
        }, { new: true });
        if (!updatedMobilesList) {
            res.status(201).send({
                message: 'No mobiles',
                data: '',
                status: 201
            });
            return;
        }
        res.status(200).send({
            message: 'Success',
            data: updatedMobilesList,
            status: 200
        });
        return;
    } catch (err) {
        res.status(500).send({
            message: 'No mobiles',
            data: '',
            status: 500
        });
        return;
    }
};

const boughtMobiles = async (req, res) => {
    try {
        const boughtMobilesList = await mobile.find({
            'buyerUserName': (req.params.buyerName)
        });
        if (!boughtMobilesList[0]) {
            res.status(201).send({
                message: 'No mobiles',
                data: '',
                status: 201
            });
            return;
        }
        res.status(200).send({
            message: 'Success',
            data: boughtMobilesList,
            status: 200
        });
        return;
    } catch (err) {
        res.status(500).send({
            message: 'No mobiles',
            data: '',
            status: 500
        });
        return;
    }
};

const soldMobiles = async (req, res) => {
    try {
        const soldMobilesList = await mobile.find({
            'userName': (req.params.userName)
        });
        if (!soldMobilesList[0]) {
            res.status(201).send({
                message: 'No mobiles',
                data: '',
                status: 201
            });
            return;
        }
        res.status(200).send({
            message: 'Success',
            data: soldMobilesList,
            status: 200
        });
        return;
    }

    catch (err) {
        res.status(500).send({
            message: 'Bad request',
            data: '',
            status: 500
        });
        return;

    }
};

module.exports = {
    mobileList,
    addMobile,
    getBrands,
    getCity,
    toggleLike,
    getSearchBrand,
    mobileDescription,
    deleteMobile,
    boughtMobiles,
    soldMobiles,
    updateMobilePrice,
    updateSoldMobile
};
