const express = require('express');
const { UserController } = require('../Controllers/user.controller');
const { authenticate } = require('../Middlewares/authenticate');

const userRoute = express.Router();

// register user
userRoute.post('/register', UserController.register);

// login user
userRoute.post('/login', UserController.login);

// get user profile
userRoute.get('/profile', authenticate, UserController.getProfile);

// update user profile
userRoute.patch('/profile', authenticate, UserController.updateProfile);

// change password
userRoute.patch('/change-password', authenticate, UserController.changePassword);

// logout user
userRoute.post('/logout', authenticate, UserController.logout);


module.exports = { userRoute };