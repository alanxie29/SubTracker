var express = require('express'),
    routes = express.Router();
    ProtectedRoutes = express.Router();
var userController = require('./controller/user-controller');
var subController = require('./controller/sub-controller');
var passport = require('passport');
var jwt = require('jsonwebtoken')
var config = require('./config/config')

routes.get('/', (req, res) => {
    return res.send('Hello, this is the API!');
});

routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);

ProtectedRoutes.use((req, res, next) => {
    var token = req.headers['access-token'];

    if (token) {
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err) {
                return res.json({ message: 'invalid token' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.json({
            message: 'No Token Provided.'
        });
    }
});

ProtectedRoutes.get('/special', passport.authenticate('jwt', {session: true }), (req, res) => {
    return res.json({ msg: `Hey ${req.user.email}! I open at the close.`});
});

ProtectedRoutes.put('/create/:userId', subController.createSubscription);
ProtectedRoutes.delete('/delete/:userId/:subscriptionId', subController.deleteById);
ProtectedRoutes.put('/update/:userId/:subscriptionId', subController.updateById);


module.exports = routes, ProtectedRoutes;