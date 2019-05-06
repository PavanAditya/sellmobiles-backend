const {
    formSchema
} = require('../models/user.model');
const {
    mobile
} = require('../models/mobile.model');

const getRegisteredUsers = async (req, res) => {
    try {
        const registeredUsersList = await formSchema.aggregate([{
            $lookup: {
                from: 'mobiles',
                localField: 'userName',
                foreignField: 'userName',
                as: 'mobilesuploaded'
            }
        }]);
        if (!registeredUsersList) {
            res.json({
                message: 'Bad Request',
                data: '',
                status: 500
            });
            return;
        }
        res.json({
            message: 'Registered Users List Fetched',
            data: registeredUsersList,
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

const getRegisteredUsersCount = async (req, res) => {
    try {
        const registeredUsersList = await formSchema.find({}).count();
        if (!registeredUsersList) {
            res.json({
                message: 'Bad Request',
                data: '',
                status: 500
            });
            return;
        }
        res.json({
            message: 'Registered Users Count List Fetched',
            data: registeredUsersList,
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

const getOnlineUsers = async (req, res) => {
    try {
        const onlineUsersList = await formSchema.find({
            tokens: {
                $exists: true,
                $ne: []
            }
        });
        if (!onlineUsersList) {
            res.json({
                message: 'Bad Request',
                data: '',
                status: 500
            });
            return;
        }
        res.json({
            message: 'Online Users List Fetched',
            data: onlineUsersList,
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

const getOnlineUsersCount = async (req, res) => {
    try {
        const onlineUsersList = await formSchema.find({
            tokens: {
                $exists: true,
                $ne: []
            }
        }).count();
        if (!onlineUsersList) {
            res.json({
                message: 'Bad Request',
                data: '',
                status: 500
            });
            return;
        }
        res.json({
            message: 'Online Users Count List Fetched',
            data: onlineUsersList,
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

const getMobilesSoldCount = async (req, res) => {
    try {
        const mobilesSoldCount = await mobile.find({
            buyerUserName: {
                $exists: true,
                $ne: []
            }
        }).count();
        if (!mobilesSoldCount) {
            res.json({
                message: 'Bad Request',
                data: '',
                status: 500
            });
            return;
        }
        res.json({
            message: 'Mobiles Sold Count Fetched',
            data: mobilesSoldCount,
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

const getPostsCount = async (req, res) => {
    try {
        const postsCount = await mobile.find({}).count();
        if (!postsCount) {
            res.json({
                message: 'Bad Request',
                data: '',
                status: 500
            });
            return;
        }
        res.json({
            message: 'Total Number Of Posts Fetched',
            data: postsCount,
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

const getLikedPosts = async (req, res) => {
    try {
        const topLikedPosts = await mobile.aggregate([{
                $project: {
                    count: {
                        $size: '$likedBy'
                    },
                    image: true,
                    brand: true,
                    model: true,
                    location: true,
                    price: true,

                }
            },
            {
                $sort: {
                    count: -1
                }
            },
            {
                $limit: 5
            }
        ]);
        if (!topLikedPosts) {
            res.json({
                message: 'Bad Request',
                data: '',
                status: 500
            });
            return;
        }
        res.json({
            message: 'Top Liked Mobiles List Fetched',
            data: topLikedPosts,
            status: 200
        });

    } catch (err) {
        res.json({
            message: 'Bad Request ani',
            data: err,
            status: 500
        });
    }

};

const deleteUserPost = async (req, res) => {
    try {
        const deletePost = await mobile.deleteOne({
            _id: req.params._id
        });
        if (!deletePost) {
            res.json({
                message: 'Bad Request',
                data: '',
                status: 500
            });
            return;
        }
        res.json({
            message: 'Deleted Post Successfully',
            data: deletePost,
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

const getMobilesCount = async (req, res) => {
    try {
        const mobilesCount = await mobile.aggregate([{
            $group: {
                _id: '$brand',
                count: {
                    $sum: 1
                }
            }
        }]);
        if (!mobilesCount) {
            res.json({
                message: 'Bad Request here',
                data: '',
                status: 500
            });
            return;
        }
        res.json({
            message: 'Mobiles Count Fetched',
            data: mobilesCount,
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

const getMobilesLikesCount = async (req, res) => {
    try {
        const mobilesLikesCount = await mobile.aggregate([{
            $group: {
                _id: '$brand',
                count: {
                    $sum: {
                        $size: '$likedBy'
                    }
                }
            }
        }]);
        if (!mobilesLikesCount) {
            res.json({
                message: 'Bad Request here',
                data: '',
                status: 500
            });
            return;
        }
        res.json({
            message: 'Mobiles Likes Count Fetched',
            data: mobilesLikesCount,
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

const getLocationCount = async (req, res) => {
    try {
        const locationCount = await mobile.aggregate([{
            $group: {
                _id: '$location',
                count: {
                    $sum: 1
                }
            }
        }]);
        if (!locationCount) {
            res.json({
                message: 'Bad Request here',
                data: '',
                status: 500
            });
            return;
        }
        res.json({
            message: 'Mobiles Count On Loaction Fetched',
            data: locationCount,
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

const adminControllers = {
    getRegisteredUsers,
    getOnlineUsers,
    getOnlineUsersCount,
    getRegisteredUsersCount,
    getLikedPosts,
    getPostsCount,
    getMobilesSoldCount,
    deleteUserPost,
    getMobilesCount,
    getMobilesLikesCount,
    getLocationCount
};

module.exports = {
    adminControllers: adminControllers
};