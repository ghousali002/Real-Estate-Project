const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    members: {
        type: Array,
        required: true,
    },
    lastMessage: {
        type: String, 
        default: null, 
    },
    lastMessageDate: {
        type: Date, 
        default: null,
    }
});
const Conversation = mongoose.model('Conversation', conversationSchema); 

module.exports = Conversation; 
