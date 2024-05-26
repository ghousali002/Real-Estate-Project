const express = require('express');
const router = express.Router();
const Conversation = require('../models/conversationSchema');
const buyerDB = require('../models/buyerSchema');
const sellerDB = require('../models/sellerSchema');

//Get all conversations for a Buyer
router.get('/BuyerConversations/:buyerId', async (req, res) => {
  try {
    const { buyerId } = req.params;
    if (!buyerId || String(buyerId) === 'null' ) {
      return res.status(400).json({ message: "buyerId is required" });
    }

    const conversations = await Conversation.find({ members: buyerId });
    const conversationsWithsellerDetails = await Promise.all(conversations.map(async conversation => {
      const sellerId = conversation.members[0];
      const seller = await sellerDB.findById(sellerId);
      const sellerProfilePicture = seller.profilePhoto ? seller.profilePhoto : 'null';
      const lastMessage = conversation.lastMessage ? conversation.lastMessage : null;
      const lastMessageDate= conversation.lastMessageDate ? conversation.lastMessageDate : null;
      const unreadItem = conversation.unread.find(unreadItem => unreadItem.senderId !== buyerId);
      let unread = 0;
      if (unreadItem) {
        unread = unreadItem.count;
      }

      return {
        ...conversation.toObject(),
        buyerProfilePicture: sellerProfilePicture,
        buyerName: seller.Name,
        lastMessage,
        lastMessageDate,
        unread
      };
    }));
    console.log('conversationsWithsellerDBDetails: ',conversationsWithsellerDetails);
    res.json(conversationsWithsellerDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


// Get all conversations for a Seller
router.get('/SellerConversations/:sellerId', async (req, res) => {
  try {
    const { sellerId } = req.params;
    if (!sellerId) {
      return res.status(400).json({ message: "sellerId are required" });
    }

    const conversations = await Conversation.find({ members: sellerId });

    const conversationsWithBuyerDetails = await Promise.all(conversations.map(async conversation => {
      const buyerId = conversation.members[1];
      const lastMessage = conversation.lastMessage ? conversation.lastMessage : null;
      const lastMessageDate= conversation.lastMessageDate ? conversation.lastMessageDate : null;
      const buyer = await buyerDB.findById(buyerId);
      const buyerProfilePicture = buyer.profilePhoto ? buyer.profilePhoto : 'null';
      const unreadItem = conversation.unread.find(unreadItem => unreadItem.senderId !== sellerId);
      let unread = 0;
      if (unreadItem) {
        unread = unreadItem.count;
      }
      return {
        ...conversation.toObject(),
        buyerProfilePicture: buyerProfilePicture,
        buyerName: buyer.Name,
        lastMessage,
        lastMessageDate,
        unread
      };
    }));
    console.log('conversationsWithBuyerDetails: ',conversationsWithBuyerDetails);
   
    res.json(conversationsWithBuyerDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Create a new conversation
router.post('/createConversation', async (req, res) => {
  try {
    const { PropertyId, propertySallerId,buyerId } = req.body;

    //console.log('PropertyId, propertySallerId, studentId : ', PropertyId,propertySallerId, buyerId); 
    if (!propertySallerId || !buyerId || String(propertySallerId) === 'null' || String(buyerId) === 'null') {
      return res.status(400).json({ message: "Both SallerId and buyerId are required" });
    }
 
    const existingConversation = await Conversation.findOne({
      members: { $all: [propertySallerId, buyerId] }
    });

    if (existingConversation) {
      return res.status(200).json({ _id: existingConversation._id });
    }
//in this i have set sellerId in the 0 index of members and buyerid in the 1 index of members always
    const conversation = new Conversation({
      members: [propertySallerId, buyerId]
    });
    await conversation.save();
    res.status(201).json({conversation,PropertyId: PropertyId});
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
