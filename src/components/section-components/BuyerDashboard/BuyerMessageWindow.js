import PropTypes from "prop-types";
import React from 'react';
import { useState, useRef, useEffect } from "react";
import "./MessageSidebar.css";
import EmojiPicker from "emoji-picker-react";
import { IoMdAttach } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";
//import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
//import AttachFileIcon from "@mui/icons-material/AttachFile";
import { MessageList } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import toast from "react-hot-toast";




const BuyerMessageWindow = ({ messages, activeConversation, selectedChatId, lastSeen, setMessages, recieverId,socket }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const emojiPickerRef = useRef();
    const messageBodyRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (messageBodyRef.current) {
            messageBodyRef.current.scrollTop = messageBodyRef.current.scrollHeight;
        }
    };
    const handleEmojiClick = (emojiObject) => {
        setInputValue(prevInputValue => prevInputValue + emojiObject.emoji);
        // Removed the setShowEmojiPicker(false) to keep the emoji picker open
    };


    const toggleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
                setShowEmojiPicker(false);
            }
        };

        if (showEmojiPicker) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showEmojiPicker]);


    const handleSend = async () => {
        try {
            if (!selectedChatId) {
                console.log('please select a chat');
                toast.error('Please select a chat');
                return;
            }

            if (!inputValue.trim()) {
                console.log("Input value is empty");
                toast.error('Please enter a message');
                return;
            }
            const buyerId = localStorage.getItem('buyerId');

            //in route i just made conversationID, senderId and message=text in backend for database
            const messageData = {
                conversationId: selectedChatId,
                senderId: buyerId,
                recieverId:recieverId,
                text: inputValue.trim(),
                type: "text",
                date: new Date(),
            };
            socket.emit('sendMessage', messageData);

            // const response = await fetch('http://localhost:5000/messages', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(messageData),
            // });

            // if (!response.ok) {
            //     throw new Error('Failed to send message');
            // }
            setInputValue('');
            //   socket?.emit('sendMessage', { 
            //     conversationId : selectedChatId, 
            //     senderId : senderId, 
            //     recieverId:recieverId,
            //     text: inputValue.trim(), 
            //     type: 'text', 
            //     date: new Date() });
            // const newMessage = {
            //     position: "right",
            //     type: "text",
            //     text: inputValue.trim(),
            //     date: new Date(),
            // };
            // setMessages(prevMessages => [...prevMessages, newMessage]);
            toast.success('Message sent successfully');
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Failed to send message. Please try again later.');
        }
    };
    return (
        <>
            <div className="message-window">
                <div className="message-header">
                    <h3>{activeConversation}</h3>
                    <div className="last-seen">
                        {lastSeen ? `Last seen: ${lastSeen}` : 'Not available'}
                    </div>
                </div>
                <div className="message-body" ref={messageBodyRef} style={{ scrollBehavior: 'smooth', height: 'calc(60vh - 20px)', maxHeight: '500px' }}>
                    <MessageList className="message-list" lockable={false} dataSource={messages} />
                  
                </div>
                <div className="message-input">
                    <button onClick={toggleEmojiPicker} type="button" className="emoji-button">
                        {/* <EmojiEmotionsIcon /> */}
                        <BsEmojiSmile />
                    </button>
                    <button type="button" className="attachment-button">
                        {/* <AttachFileIcon /> */}
                        <IoMdAttach />
                    </button>
                    <input
                        type="text"
                        placeholder="Type a message"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSend();
                            }
                        }}
                    />
                    <button type="button" className="send-button" onClick={handleSend} >
                        Send
                    </button>
                    <div className={`emoji-picker-container ${showEmojiPicker ? 'show' : ''}`} ref={emojiPickerRef}>
                        {showEmojiPicker && (
                            <div className="emoji-picker-modal">
                                <EmojiPicker onEmojiClick={handleEmojiClick} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

BuyerMessageWindow.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            content: PropTypes.string.isRequired,
            time: PropTypes.string.isRequired,
            isOwn: PropTypes.bool,
        })
    ).isRequired,
    activeConversation: PropTypes.string.isRequired,
    selectedChatId: PropTypes.string.isRequired,
    lastSeen: PropTypes.string.isRequired,
    recieverId: PropTypes.string.isRequired,
    setMessages: PropTypes.func.isRequired,
    socket: PropTypes.object.isRequired,
};

export default BuyerMessageWindow;