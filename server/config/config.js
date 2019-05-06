const config = require('./config.json');

process.env.PORT = config.development.PORT;
process.env.MONGODB_URI = config.development.MONGODB_URI;
process.env.JWT_SECRET = config.development.JWT_SECRET;
process.env.EMAIL = config.development.EMAIL;
process.env.PASSWORD = config.development.PASSWORD;
process.env.ENV = config.development.ENV;
process.env.FRONTEND_URL = config.development.FRONTEND_URL;

process.env.GOOGLE_CLIENT_ID = config.development.GOOGLE_WEB.client_id;
process.env.GOOGLE_CLIENT_SECRET = config.development.GOOGLE_WEB.client_secret;
process.env.GOOGLE_REDIRECT_URL = config.development.GOOGLE_WEB.redirect_uris[0];

process.env.GITHUB_CLIENT_ID = config.development.GITHUB_WEB.client_id;
process.env.GITHUB_CLIENT_SECRET = config.development.GITHUB_WEB.client_secret;
process.env.GITHUB_REDIRECT_URL = config.development.GITHUB_WEB.redirect_uris[0];

