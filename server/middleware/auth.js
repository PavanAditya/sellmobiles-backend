const jwt = require('jsonwebtoken');
const {
    formSchema
} = require('../models/user.model');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const userFound = await formSchema.findOne({
            'tokens.token': token
        });
        if (userFound.loginMethod !== 'google') {
            const decoded = jwt.verify(token, 'thisismynewcourse');
            const user = await formSchema.findOne({
                email: decoded.email,
                'tokens.token': token
            });
            if (!user) {
                throw new Error();
            }
            req.token = token;
            req.user = user;
        }
        else {
            req.token = token;
            req.user = userFound;
        }
        next();
        return;

    } catch (e) {
        res.status(401).json({
            message: 'Oops invalid User !',
        });
    }
};

module.exports = {
    auth: auth
};