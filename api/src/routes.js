var express = require('express'),
    routes = express.Router();
var userController = require('./controller/user-controller');
var subController = require('./controller/sub-controller');
var passport = require('passport');

routes.get('/', (req, res) => {
    return res.send('Hello, this is the API!');
});

routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);

routes.get('/special', passport.authenticate('jwt', {session: true }), (req, res) => {
    return res.json({ msg: `Hey ${req.user.email}! I open at the close.`});
});

routes.put('/create/:userId', subController.createSubscription);
routes.delete('/delete/:userId/:subscriptionId', subController.deleteById);
routes.put('/update/:userId', subController.updateById);

module.exports = routes;