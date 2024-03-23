const jwt = require("jsonwebtoken");
const secretKey = "realStateSecretKey";
const Seller = require("../models/sellerSchema");
const Buyer = require("../models/buyerSchema");

exports.uploadPhoto = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      console.log("No token, authorization denied");
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.userId;

    // Find the user by userId
    const user = await Seller.findById(userId);
    const user1 = await Buyer.findById(userId);
    if (!user && !user1) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    // Check if photo file exists in the request
    if (!req.file) {
      console.log("No photo file in the request");
      return res.status(400).json({ message: "No photo file in the request" });
    }

    if(user)
    {
    user.profilePhoto = req.file.filename;
    await user.save();
    res.status(200).json({ message: "Photo uploaded successfully", user });
    }
    else {
      user1.profilePhoto = req.file.filename;
      await user1.save();
      res.status(200).json({ message: "Photo uploaded successfully", user1 });
    }

  } catch (error) {
    console.error("Error uploading photo", error);
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
};

exports.description = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      console.log("No token, authorization denied");
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.userId;

    const user = await Seller.findById(userId);
    const user1 = await Buyer.findById(userId);
    if (!user && !user1) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    if(user)
    {
      user.description = req.body.description;
      await user.save();
    }
    else {
      user1.description = req.body.description;
      await user1.save();
    }

    res.status(200).json({
      message: "Data Saved successfully",
      user
    });
  } catch (error) {
    console.error("Not Inserted Data", error);
    return res.status(500).json({ message: "An Unexpected Error Occurred" });
  }
};