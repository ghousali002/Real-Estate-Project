const express = require("express");
const cors = require("cors");
const moongoose = require("mongoose");
const userRoutes = require('./routes/signupRoutes');
const path = require('path');
const io = require("socket.io")(8000, {
  cors: {
    origin: "http://localhost:3000",
  }
});
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
const conversationRoutes = require('./routes/conversationRoutes');
const messageRoutes = require('./routes/messageingRoutes');
const Message = require('./models/messageSchema');
const Convo = require('./models/conversationSchema');


let connectedClients = [];

io.on("connection", (socket) => {
  // console.log("New client connection:", socket.id);
  // Store user information when a client connects
  socket.on("addUser", (userId) => {
    const isUserExist = connectedClients.find((user) => user.userId === userId);
    if (!isUserExist) {
      console.log("New client connected:", socket.id);

      const user = { userId: userId, socketId: socket.id };
      connectedClients.push(user);
      io.emit('getUser', connectedClients);
    }else{
      const existingUserIndex = connectedClients.findIndex(
        (user) => user.userId === userId
      );
      console.log("User already exists, updating socketId:", socket.id);
      connectedClients[existingUserIndex].socketId = socket.id;
      io.emit('getUser', connectedClients);
    }
  });
  socket.on('disconnect', () => {
    //connectedClients = connectedClients.filter((user) => user.socketId !== socket?.id);  crashed
    const index = connectedClients.findIndex((user) => user.socketId === socket?.id);
    if (index !== -1) {
      connectedClients.splice(index, 1);
      io.emit('getUser', connectedClients);
    }
    io.emit('getUser', connectedClients);
    
  });

  socket.on('sendMessage', async (msgdata) => {
    const reciever = connectedClients.find((user) => user.userId === msgdata.recieverId);
    console.log('data',msgdata);
    console.log('connectedClients: ',connectedClients)
    if(reciever){
      console.log('reciever find in connected clients: ',reciever);
      io.to(reciever.socketId).emit('getMessage', msgdata);
    }
    io.to(socket.id).emit('sendItself', msgdata);
    const { conversationId, senderId, text,type ,date } = msgdata;
    await Convo.findByIdAndUpdate(conversationId, {
      lastMessage: text,
      lastMessageDate: date
    });
    
    const newMessage = new Message({ conversationId, senderId, message:text, type,date});
    await newMessage.save();
    const lastMessageObj= {conversationId,text,date} 
    // io.to(socket.id).emit('updateLastMessageItself', lastMessageObj );
    // if(reciever){
    //   io.to(reciever.socketId).emit('GetupdateLastMessage',lastMessageObj );
    // }
   
  

  })
  
});

app.use("/uploads",express.static(path.join(__dirname,"uploads")));
app.use(conversationRoutes);
app.use(messageRoutes);
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