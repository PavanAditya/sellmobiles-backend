// ! built in imports
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const socketio = require('socket.io');

// ! Userdefined imports
const {
    authRoute
} = require('./routes/auth.routes');
const {
    mobileRoute
} = require('./routes/mobile.routes');
const {
    userRoute
} = require('./routes/user.routes');
const {
    adminRoute
} = require('./routes/admin.routes');

const {
    passportRoute
} = require('./routes/passport.routes');
const {
    chatRoute
} = require('./routes/chat.routes');

const socketRoute = require('./routes/socket.routes');

// ! Swagger imports
const swaggerDocument = require('./config/swagger.json');
const passportConfig = require('./middleware/passport/passport-config');

const PORT = process.env.PORT || 3000;
const app = express();
const httpServer = app.listen(PORT, () => {});
const socket = socketio(httpServer);

// ! Parse incoming request bodies
app.use(bodyParser.json());

// ! CORS are used to sharing resources from cross origin.
app.use((req, resp, next) => {
    // ? before continuing the request to next middleware just written below this middleware want to remove CORS error
    resp.header('Access-Control-Allow-Origin', '*'); // ? Allowing access to specific the url/paths
    resp.header('Access-Control-Allow-Credentials', true); // ? Allowing access Credentials
    resp.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // ? Allowing these headers key
    resp.setHeader('Access-Control-Expose-Headers', 'record-count, my-token, x-auth'); // ? Allowing the custom-header to be exposed to frontend
    resp.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS'); // ? Allowing these REST Methods
    next();
});

// ! Swagger api documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    explorer: true
}));

// ! Passport configuration
passportConfig.passportConfig(app);

// ! Test Route for working
app.get('/', (req, res) => {
    res.send('hello world');
});

// ! using the routes defined for auth
//  http://localhost:3000/api/v1/auth
app.use('/api/v1/auth', authRoute);

// ! using the routes defined for mobile
//  http://localhost:3000/api/v1/mobiles
app.use('/api/v1/mobiles', mobileRoute);

// ! using the routes defined for user
//  http://localhost:3000/api/v1/users
app.use('/api/v1/users', userRoute);

// ! using the routes defined for admin
//  http://localhost:3000/api/v1
app.use('/api/v1/admin', adminRoute);

// ! passport routes
//  http://localhost:3000/api/v1/passport
app.use('/api/v1/auth/passport', passportRoute);

// ! chat routes
//  http://localhost:3000/api/v1/chat
app.use('/api/v1/chat', chatRoute);

// ! socket routes
//  http://localhost:3000/api/v1/socket
new socketRoute(socket).socketConfig();