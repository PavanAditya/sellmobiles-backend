const {
    mongoose
} = require('../db/mongoose.config');
const Schema = mongoose.Schema;

// ! creating schema for user
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    mobileNumber: {
        type: String,
        unique: true
    },
    location: {
        type: String
    },
    token: {
        type: String,
        required: true
    }
});

const thirdUser = mongoose.model('thirdUser', userSchema);

module.exports = {
    userSchema: thirdUser
};