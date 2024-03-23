const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
    email: {type: String, required: true,
        unique: true
    },
    Name: {
        type: String, required: true
    },
    password: {
        type: String, required: true
    },
    profilePhoto: {
        type: String,
        default: null,
    },
    description: {
        type: String,
        default: null,
    },
    isVerified: { type: Boolean, default: false },
    verificationToken: {type: String,default: null},
});

const Buyer = mongoose.model('Buyer', buyerSchema);

module.exports = Buyer;