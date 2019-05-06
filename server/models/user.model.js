const {
    mongoose
} = require('../db/mongoose.config');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ! creating schema for user
const formSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    userName: {
        type: String,
        default: null
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobileNumber: {
        type: String
    },
    location: {
        type: String
    },
    password: {
        type: String
    },
    confirmPassword: {
        type: String
    },
    loginMethod: {
        type: String,
        default: null
    },
    google: {
        type: String,
        default: null
    },
    github: {
        type: String,
        default: null
    },
    online: {
        type: String
    },
    socketId: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    date: {
		type: Date,
		default: Date.now,
		required: true
	}
});


formSchema.plugin(uniqueValidator);

//! form here we are setting up a new method and can call from anywhere and due to binding we will use async function not arrow function
// methods are accesseble on 'instances' and some times called instance methods
formSchema.methods.generateAuthToken = async function () {

    //!here we are calling this on a specific user and we get access to that user by using 'this'
    const user = this;
    const token = jwt.sign({
        email: user.email
    }, 'thisismynewcourse');
    const online = 'Y';
    user.online = online;  // TODO: Check
    // user.socketId = '';  // TODO: Check
    user.tokens = user.tokens.concat({
        token: token
    });
    await user.save();

    return {
        token,
        user
    };


};

// ! static methods are accesseble on 'model' sometimes also called model methods
formSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({
        email: email
    });

    if (!user) {
        return false;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return false;
    }
    return user;
};
//hashing the password just before user is getting saved.
// ! we have not used arrow function because this binding plays an important role and as we know arrow function doesn't binds
formSchema.pre('save', async function (next) {
    //! this gives the access to the individual users who are about to be saved
    const user = this;
    if (user.loginMethod === 'local') {
        if (user.isModified('password')) {
            user.password = await bcrypt.hash(user.password, 10);
            user.confirmPassword = await bcrypt.hash(user.confirmPassword, 10);
        }
    }

    // ! it is called so that the request can be passed to the route handlers.
    next();
});
const User = mongoose.model('users', formSchema);
module.exports = {
    formSchema: User
};