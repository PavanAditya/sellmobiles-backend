const {
    mongoose
} = require('../db/mongoose.config');

// ! creating schema for brands and it's model
const brandSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
    },
    model: [{
        type: String,
        required: true
    }]
});

const brands = mongoose.model('brands', brandSchema);

module.exports = {
    brandSchema: brands
};
