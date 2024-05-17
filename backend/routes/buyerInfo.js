const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const BuyerDB = require("../models/buyerSchema");
const SellerDB = require("../models/sellerSchema");
const secretKey = "realStateSecretKey";
const nodemailer = require('nodemailer');
const SalePropertyDetail=require("../models/SalePropertyDetail.models")
const RentPropertyDetail=require("../models/RentPropertyDetail.models")


const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: 'arhumnaveed092@gmail.com',
        pass: 'qhwm oxhc mmvy ujms', 
  },
});

const sendEmail = async (recipientEmail, subject, text) => {
  try {
    const mailOptions = {
      from: 'arhumnaveed092@gmail.com', // Your Gmail email address
      to: recipientEmail,
      subject: subject,
      text: text,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Helper function to promisify jwt.verify
const verifyToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

// Route to get user details
router.get("/user", async (req, res) => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
 

    if (!token) {
      console.log("No token, authorization denied");
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
      const decoded = await verifyToken(token, secretKey);
      req.userId = decoded.userId;
    } catch (err) {
      console.log("Token not valid");
      return res.status(401).json({ message: "Token is not valid" });
    }

    const userId = req.userId;
    const user = await BuyerDB.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
});


router.post('/book-property/:userId', async (req, res) => {
  const { propertyId } = req.body;
  const { userId } = req.params;

  try {
    // Find the user by userId
    const user = await BuyerDB.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Push the propertyId to the user's bookedSaleProperties array
    user.bookedSaleProperties.push(propertyId);

    // Save the updated user object
    await user.save();

    const property = await SalePropertyDetail.findById(propertyId);
    console.log("this is property details",property)
    const ownerName = property.Owner;

    console.log("this is the owner",ownerName)

    const owner= await SellerDB.findOne({ Name: ownerName });

    if (owner) {
      console.log("this is the owner details",owner)
      console.log("this is the owner email",owner.email)

    }

    if (!owner) {
      console.log("Sale Property booked successfully but without notify owner, owner does not exist")
      return res.status(200).json({ message: 'Property booked successfully but without notify owner, owner does not exist', user });
    }

    // Send an email to the property owner
    await sendEmail(owner.email, 'Property Booked', `Your property (${property.PropertyTitle}) has been booked.`);

    console.log("mail sent to property owner")
    res.status(200).json({ message: 'Property booked successfully', user });
  } catch (error) {
    console.error('Error booking property:', error);
    res.status(500).json({ message: 'An error occurred while booking the property' });
  }
});


router.post('/book-property-rent/:userId', async (req, res) => {
  const { propertyId } = req.body;
  const { userId } = req.params;

  try {
    // Find the user by userId
    const user = await BuyerDB.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Push the propertyId to the user's bookedSaleProperties array
    user.bookedRentProperties.push(propertyId);

    // Save the updated user object
    await user.save();

    
    const property = await RentPropertyDetail.findById(propertyId);
    console.log("this is property details",property)
    const ownerName = property.Owner;

    console.log("this is the owner",ownerName)

    const owner= await SellerDB.findOne({ Name: ownerName });

    if (owner) {
      console.log("this is the owner details",owner)
      console.log("this is the owner email",owner.email)

    }

    if (!owner) {
      console.log("Rent Property booked successfully but without notify owner, owner does not exist")
      return res.status(200).json({ message: 'Property booked successfully but without notify owner, owner does not exist', user });
    }

    // Send an email to the property owner
    await sendEmail(owner.email, 'Property Booked', `Your property (${property.PropertyTitle}) has been booked.`);

    console.log("mail sent to property owner")

    res.status(200).json({ message: 'Property booked successfully', user });
  } catch (error) {
    console.error('Error booking property:', error);
    res.status(500).json({ message: 'An error occurred while booking the property' });
  }
});


router.get('/get-buyers', async (req, res) => {
  try {
    const users = await BuyerDB.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});
module.exports = router;
