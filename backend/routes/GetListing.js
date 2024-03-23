const express = require('express');
const router = express.Router();
const buyerListingController = require('../controller/buyerListingController');

// Define the user registration route
router.get('/getlistingsale', buyerListingController.GetSaleProperty);

router.get('/getlistingrent', buyerListingController.GetRentProperty);

module.exports = router;