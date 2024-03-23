const express = require('express');
const router = express.Router();
const buyerListingController = require('../controller/buyerListingController');
const upload = require('../multerConfig');

// Define the user registration route
router.post('/addlisting',upload.single('photo'), buyerListingController.AddProperty);

router.post('/addlistingrent',upload.single('photo'), buyerListingController.AddPropertyRent);

module.exports = router;