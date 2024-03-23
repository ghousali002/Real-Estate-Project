const express = require('express');
const router = express.Router();
const BuyersignupController = require('../controller/buyerSignup');

// Define the user registration route
router.post('/signup', BuyersignupController.isNewUser,
BuyersignupController.isUserSeller,
BuyersignupController.isPasswordValid,
BuyersignupController.sendEmailVerification,
BuyersignupController.SignUp,
);

router.get('/verify/:token', BuyersignupController.verifyEmail);

module.exports = router;