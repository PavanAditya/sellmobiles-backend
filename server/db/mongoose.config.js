const mongoose = require('mongoose');

// const url = 'mongodb://mongoUser2:User2pwd@orchardmongo.eastus.cloudapp.azure.com:27017/Orchard2';
const url = 'mongodb+srv://pavanaditya_ms:adish789@sellmobiles-cluster-nwupp.mongodb.net/sellmobiles-db?retryWrites=true';
const urlParser = {
    useNewUrlParser: true
};
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(url, urlParser)
    .catch(err => {
        // process.exit(1);
        return err;
    });
module.exports = { mongoose };