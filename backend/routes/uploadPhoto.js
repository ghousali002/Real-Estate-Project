const express = require('express');
const router = express.Router();
const Photo = require('../controller/Photo');
const upload = require('../multerConfig');

// Define the user registration route
router.post('/uploads',upload.single('photo'),Photo.uploadPhoto);
router.post('/description',Photo.description);

module.exports = router;