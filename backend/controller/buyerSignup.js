const buyer = require('../models/buyerSchema'); 
const seller = require('../models/sellerSchema'); 
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const stripeLib = require("stripe");


const STRIPE_SECRET =
  "sk_test_51Obp44KAlnAzxnFU9PrEBv0K27IsOThelFXmUSTkJk7nhzQ0V20hHm75bDPLsYnPnwWs52TIzmz61rUn1U3uQxH500Ob1C6BIw";
const stripe = stripeLib(STRIPE_SECRET);

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: 'arhumnaveed092@gmail.com',
          pass: 'qhwm oxhc mmvy ujms', 
    },
  });

const verificationToken = crypto.randomBytes(20).toString('hex');

exports.sendEmailVerification = (req, res, next) => {
    const email = req.body.buyeremail;
  
    const mailOptions = {
      from: 'arhumnaveed092@gmail.com',
      to: email,
      subject: 'Email Verification',
      text: `Please click the following link to verify your email: http://localhost:5000/buyer/verify/${verificationToken}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email verification error:", error);
        return res
          .status(500)
          .json({ error: "Error sending email verification" });
      } else {
        console.log("Email verification sent:", info.response);
  
        next();
      }
    });
};

exports.verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.params;

        const user = await buyer.findOneAndUpdate(
            { verificationToken: token },
            { $set: { isVerified: true, verificationToken: null } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: 'Invalid verification token' });
        }

        // Redirect to the specified URL
        const redirectUrl = 'http://localhost:3000/';
        res.redirect(`${redirectUrl}?isVerified=true`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

  
exports.isNewUser = (req, res, next) => {
    const email = req.body.buyeremail;
  
    buyer.findOne({ email: email }).then((user) => {
      if (user) {
        return res.status(400).json({ error: "Email already taken" });
      }
      next();
    });
  };
  
  exports.isUserSeller = (req, res, next) => {
    const email = req.body.buyeremail;
  
    seller.findOne({ email: email }).then((user) => {
      if (user) {
        return res.status(402).json({ error: "Seller Email already taken" });
      }
      next();
    });
  };

exports.isPasswordValid = (req, res, next) => {
    const password = req.body.buyerpassword;
  
    const minLengthRegex = /^.{8,}$/;
    const capitalLetterRegex = /[A-Z]/;
    const specialCharacterPattern = "[!@#$%^&*()_+{}\\[\\]:;<>,.?~\\-=|\\\\/]";
    const specialCharacterRegex = new RegExp(specialCharacterPattern);
  
    if (
      !minLengthRegex.test(password) ||
      !capitalLetterRegex.test(password) ||
      !specialCharacterRegex.test(password)
    ) {
      return res.status(401).json({
        error:
          "Password must be at least 8 characters long and contain at least one capital letter and one special character.",
      });
    }
  
    next();
  };
  
exports.SignUp = (req, res, next) => {
    const name = req.body.buyername;
    const email = req.body.buyeremail;
    const password = req.body.buyerpassword;
    
  
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).json({ error: "Error hashing password" });
      }
  
      const newUser = new buyer({
        Name: name,
        email: email,
        password: hashedPassword,
        verificationToken: verificationToken,
      });
  
      newUser
      .save()
      .then(() => {
        return res
          .status(201)
          .json({ message: "User signup without verified false" });
      })
      .catch((error) => {
        console.error("Error adding new User:", error);
        res.json({ error: "Error adding new User" });
      });
  });
};

exports.Payment = async (request, response) => {
  try {
    const paymentAmount = request.body.paymentAmount;
    const amountInCents = paymentAmount * 0.01;

    // Perform payment processing with Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Booking Fees 50$",
            },
            unit_amount: 5000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/dashboardlinks/Bookings",
      cancel_url: "http://localhost:3000/dashboardlinks/Bookings",
    });

    // Send the session ID back to the client
    response.json({ session });
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Internal server error" });
  }
};

