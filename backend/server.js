const express = require("express");
const cors = require("cors");
const moongoose = require("mongoose");
const userRoutes = require('./routes/signupRoutes');
const path = require('path');

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const DB_uri = process.env.ATLAS_URI;
moongoose.connect(DB_uri);
const connection = moongoose.connection;
connection.once("open", () => {
  console.log("Mongo DB connection established sucessfully");
});

const BuyerLogin = require("./routes/buyerLogin");
const AdminRouter = require("./routes/Admin");
const ContactUsRouter = require("./routes/ContactUs");
const AboutUsRouter = require("./routes/AboutUs");
const TeamRouter = require("./routes/Team");
const GalleryRouter = require("./routes/Gallery");
const VideoRouter = require("./routes/Video");
const MapsRouter = require("./routes/Maps");
const RentPropertyDetailRouter = require("./routes/RentPropertyDetail");
const SalePropertyDetailRouter = require("./routes/SalePropertyDetail");
const SubmittedPropertyRequestsRouter = require("./routes/SubmittedPropertyRequests");
const sellerRoutes = require('./routes/userRoutes');
const buyerInfo = require('./routes/buyerInfo');
const AddListing = require('./routes/AddListing');
const GetListing = require('./routes/GetListing');
const uploadPhoto = require('./routes/uploadPhoto');
const buyerRoutes = require('./routes/buyerSignupRoutes');
const checkrole = require('./routes/CheckRole');


app.use("/uploads",express.static(path.join(__dirname,"uploads")));
app.use(AddListing);
app.use(checkrole);
app.use(uploadPhoto);
app.use(GetListing);
app.use('/seller',AdminRouter);
app.use('/buyer',buyerInfo);
app.use('/buyer',BuyerLogin);
app.use('/buyer', buyerRoutes);
app.use('/seller', userRoutes);
app.use("/ContactUs", ContactUsRouter);
app.use('/seller', sellerRoutes);
app.use("/AboutUs", AboutUsRouter);
app.use("/Team", TeamRouter);
app.use("/Gallery", GalleryRouter);
app.use("/Video", VideoRouter);
app.use("/Maps", MapsRouter);
app.use("/RentPropertyDetail", RentPropertyDetailRouter);
app.use("/SalePropertyDetail", SalePropertyDetailRouter);
app.use("/SubmittedPropertyRequests", SubmittedPropertyRequestsRouter);


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});