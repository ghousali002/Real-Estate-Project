const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const SellerDB = require("../models/sellerSchema");
const BuyerDB = require("../models/buyerSchema");
const secretKey = "realStateSecretKey";

// Middleware to verify the token
const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("No token, authorization denied");
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) {
    console.log("Token not valid");
      return res.status(401).json({ message: "Token is not valid" });
    }

    req.userId = decoded.userId;
    next();
  });
};

// Route to get user details
router.get("/checkRole", verifyToken, async (req, res) => {
    const userId = req.userId; // Extracted from token in the middleware
  
    try {
      // Attempt to find the user in the SellerDB
      const seller = await SellerDB.findById(userId);
      if (seller) {
        // If found in SellerDB, return role as 'seller'
        return res.json({ role: "seller", userId: userId });
      } else {
        // If not found in SellerDB, attempt to find the user in BuyerDB
        const buyer = await BuyerDB.findById(userId);
        if (buyer) {
          // If found in BuyerDB, return role as 'buyer'
          return res.json({ role: "buyer", userId: userId });
        } else {
          // If the user is not found in both databases
          return res.status(404).json({ message: "User not found in either database" });
        }
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      return res.status(500).json({ message: "An unexpected error occurred" });
    }
  });

module.exports = router;
