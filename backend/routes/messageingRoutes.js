const express = require('express');
const router = express.Router();
const  Message  = require('../models/messageSchema');

// Send a message
router.post('/messages', async (req, res) => {
  try {
    const { conversationId, senderId, text,type } = req.body;
    console.log(conversationId, senderId, text);
    const newMessage = new Message({ conversationId, senderId, message:text,type });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Fetch messages by conversationId
router.get('/messages/:conversationId', async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { userId } = req.query;
    //console.log('Fetch message using : ',conversationId,userId);
    if (!conversationId || !userId || String(userId) === 'null' ) {
      return res.status(404).json({ message: "Conversation ID and User ID are required" });
    }
    const messages = await Message.find({ conversationId });
    const formattedMessages = messages.map(message => {
      const position = message.senderId === userId ? 'right' : 'left';
      return { 
        position: position,
        type: message.type || 'text' ,
        text: message.message,
        date: message.date ? new Date(message.date): new Date(),
      };

    });
    //console.log('formattedMessages: ',formattedMessages);

    res.json(formattedMessages);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
