const router = require("express").Router();
let Buyer = require("../models/buyerSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { body, validationResult } = require("express-validator");
const secretKey = "realStateSecretKey";

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    const email = req.body.email;
    const password = req.body.password;


    let buyer = await Buyer.findOne({ email });

    if (!buyer) 
    {
       return res.status(401).json("User not found");
    }

    if (!buyer.isVerified) {
      return res.status(402).json({ message: "User is not verified" });
    }

    const passwordMatch = await bcrypt.compare(password, buyer.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Password doesn't match" });
    }

    const token = jwt.sign({ userId: buyer._id }, secretKey, {
      expiresIn: "1h", // Token expiration time
    });

    return res.json({ token, message: "Login Successful" });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "An Unexpected Error Occurred" });
  }
});

router.post("/logout", async (req, res) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      console.log("No token");
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // Split the header to get the actual token after "Bearer "
    const token = authHeader.split(" ")[1];


    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token is not valid" });
      }

      const userId = decoded.userId;

      return res.json({ message: "Logout successful" });
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
});


//   router.route('/resetPassword').post(async (req,res) => {
//         const username = req.body.username;

//         let admin = await AdminDB.findOne({username});

//         if(!admin)
//             return res.status(400).json("User Not Exist");

//         admin.pass
//   });

module.exports = router;
