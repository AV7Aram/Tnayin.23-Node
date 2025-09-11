var express = require('express');
var AuthRouter = express.Router();

const AuthController = require('../controller/AuthController');
const authController = new AuthController();

AuthRouter.get('/register', authController.showRegister);
AuthRouter.post('/register', authController.register);

AuthRouter.get('/login', authController.showLogin);
AuthRouter.post('/login', authController.login);

module.exports = AuthRouter;