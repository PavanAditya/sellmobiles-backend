const {
    mongoose
} = require('../db/mongoose.config');

// ! creating schema for mobile
const mobileSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    brand: {
        type: String
    },
    model: {
        type: String
    },
    ram: {
        type: Number
    },
    rom: {
        type: Number
    },
    primaryCamera: {
        type: Number
    },
    secondaryCamera: {
        type: Number
    },
    battery: {
        type: Number
    },
    location: {
        type: String
    },
    price: {
        type: Number
    },
    status: {
        type: Boolean
    },
    likedBy: {
        type: [String]
    },
    buyerUserName: {
        type: String
    },
    image: {
        type: [String]
    },
    date: {
		type: Date,
		default: Date.now,
		required: true
	}
});
const mobile = mongoose.model('mobiles', mobileSchema);
module.exports = {
    mobile
};