const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const SellerDB = require("../models/sellerSchema");
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
router.get("/user", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await SellerDB.findById(userId);
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
