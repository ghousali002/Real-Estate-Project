const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const BuyerDB = require("../models/buyerSchema");
const secretKey = "realStateSecretKey";

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
    console.log(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
});

module.exports = router;
