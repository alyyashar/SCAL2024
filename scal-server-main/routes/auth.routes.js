const express = require('express');
const router = express.Router();

// Validation and controllers
const {
  validRegister,
  validLogin,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require('../helpers/valid');

const {
  registerController,
  loginController,
  forgotPasswordController,
  resetPasswordController,
  verifyEmailController
} = require('../controllers/auth.controller.js');

// Register route
router.post('/register', validRegister, registerController);

// Login route
router.post('/login', validLogin, loginController);

// Forgot password route
router.post('/password/forget', forgotPasswordValidator, forgotPasswordController);

// Reset password route
router.put('/password/reset', resetPasswordValidator, resetPasswordController);

// Email activation route
router.post('/users/activate', verifyEmailController);

module.exports = router;
