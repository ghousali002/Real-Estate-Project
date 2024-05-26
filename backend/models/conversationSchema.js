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
    },
    unread: {
        type: [
            {
                senderId: { type: String , default: null },
                count: { type: Number, default: 0 }
            }
        ],
        default: []
    }

});
const Conversation = mongoose.model('Conversation', conversationSchema); 

module.exports = Conversation; 
