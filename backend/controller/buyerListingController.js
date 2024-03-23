const SalePropertyDetail = require("../models/SalePropertyDetail.models");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const secretKey = "realStateSecretKey";
const SellerDB = require("../models/sellerSchema");
const RentPropertyDetail = require("../models/RentPropertyDetail.models");

exports.AddProperty = async (req, res, next) => {
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
    const MainImage = req.file ? req.file.path : ""; // Adjust based on your file storage logic


    // Assuming SellerDB is your user model and it contains a field `Name`
    const user = await SellerDB.findById(userId);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const userName = user.Name;

    const newProperty = new SalePropertyDetail({
      userId: userId,
      _id: new mongoose.Types.ObjectId(),
      PropertyTitle: req.body.PropertyTitle,
      Address: req.body.Address,
      City: req.body.City,
      Price: req.body.Price,
      Description: req.body.Description,
      PropertyMapLocation: req.body.PropertyMapLocation,
      Bedrooms: req.body.Bedrooms,
      Livingrooms: req.body.Livingrooms,
      TypeOfProperty: req.body.TypeOfProperty,
      Bathrooms: req.body.Bathrooms,
      TotalRooms: req.body.TotalRooms,
      Kitchens: req.body.Kitchens,
      AreaSqFt: req.body.AreaSqFt,
      Owner: userName,
      YearBuilt: new Date(),
      DatePosted: new Date(),
      MainImage,
    });

    await newProperty.save();

    res.status(200).json({
      message: "Listing Created successfully",
      property: newProperty,
    });
  } catch (error) {
    console.error("Not Inserted Data", error);
    return res.status(500).json({ message: "An Unexpected Error Occurred" });
  }
};

exports.AddPropertyRent = async (req, res, next) => {
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
      const MainImage = req.file ? req.file.path : ""; // Adjust based on your file storage logic
  
  
      // Assuming SellerDB is your user model and it contains a field `Name`
      const user = await SellerDB.findById(userId);
      if (!user) {
        console.log("User not found");
        return res.status(404).json({ message: "User not found" });
      }
  
      const userName = user.Name;
  
      const newProperty = new RentPropertyDetail({
        userId: userId,
        _id: new mongoose.Types.ObjectId(),
        PropertyTitle: req.body.PropertyTitle,
        Address: req.body.Address,
        City: req.body.City,
        Price: req.body.Price,
        Description: req.body.Description,
        PropertyMapLocation: req.body.PropertyMapLocation,
        Bedrooms: req.body.Bedrooms,
        Livingrooms: req.body.Livingrooms,
        TypeOfProperty: req.body.TypeOfProperty,
        Bathrooms: req.body.Bathrooms,
        TotalRooms: req.body.TotalRooms,
        Kitchens: req.body.Kitchens,
        AreaSqFt: req.body.AreaSqFt,
        Owner: userName,
        YearBuilt: new Date(),
        DatePosted: new Date(),
        MainImage,
      });
  
      await newProperty.save();
  
      res.status(200).json({
        message: "Rent Listing Created successfully",
        property: newProperty,
      });
    } catch (error) {
      console.error("Not Inserted Data", error);
      return res.status(500).json({ message: "An Unexpected Error Occurred" });
    }
  };

exports.GetSaleProperty = async (req, res, next) => {
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

    const saleProperties = await SalePropertyDetail.find({ userId });

    res.status(200).json({
      message: "Sale properties retrieved successfully",
      properties: saleProperties,
    });
  }
  catch (error) {
    console.error("Error retrieving sale properties", error);
    return res.status(500).json({ message: "An Unexpected Error Occurred" });
  }
}


exports.GetRentProperty = async (req, res, next) => {
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

    const rentProperties = await RentPropertyDetail.find({ userId });
    console.log(rentProperties);

    res.status(200).json({
      message: "Rent properties retrieved successfully",
      properties: rentProperties,
    });
  }
  catch (error) {
    console.error("Error retrieving rent properties", error);
    return res.status(500).json({ message: "An Unexpected Error Occurred" });
  }
}