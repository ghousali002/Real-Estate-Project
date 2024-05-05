import React from "react";
import { useState, useEffect, useRef } from "react";
import { MessageList, Input, ChatList, Button } from "react-chat-elements";
import EmojiPicker from 'emoji-picker-react';
import "react-chat-elements/dist/main.css";
import { toast } from 'react-hot-toast';
import { Spinner } from "react-bootstrap";

export default function Message() {



    const sellerId = localStorage.getItem("userId");


    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [selectedChat, setSelectedChat] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [conversations, setConversations] = useState([]);
    const [recieverId, setRecieverId] = useState(null);
    const [message, setMessages] = useState([
        // {
        //     position: "right",
        //     type: "text",
        //     text: `Hi, Ghous! How are you?`,
        //     date: new Date(),
        // },
        // {
        //     position: "left",
        //     type: "text",
        //     text: `Hello! I'm good, thanks!`,
        //     date: new Date(),
        // },
    ]
    );

    const fetchMessages = async (conversationId) => {
        try {

            const url = `http://localhost:5000/messages/${conversationId}?userId=${sellerId}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }
            const data = await response.json();
            console.log(data);
            setMessages(data);
            return data;
        } catch (error) {
            console.error('Error fetching messages:', error);
            throw error;
        } finally {
            setMessageListLoading(false);
        }
    };

    useEffect(() => {
        const sellerId = localStorage.getItem("userId");
        const fetchConversations = async () => {
            try {
                const response = await fetch(`http://localhost:5000/SellerConversations/${sellerId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch conversations');
                }
                const data = await response.json();
                setConversations(data);
                //console.log("conversations: ",data);

            } catch (error) {
                toast.error(error);
                console.error(error);

            } finally {
                setchatListLoading(false);
            }
        };

        fetchConversations();

    }, []);

    const onSelectChat = (chat) => {
        //console.log("chat:",chat);
        //console.log("selectedChat:",selectedChat);
        if (chat.id !== selectedChat?.id) {
            setMessageListLoading(true);
            setSelectedChat(chat);
            fetchMessages(chat.id);
            const conversationId = chat.id;
            // console.log('conversationId: ',conversationId);
            // console.log('conversationIdcsdcmsdcds: ',conversations);
            const convo = conversations.find(chat => chat._id === conversationId);
            //console.log('convo:',convo);
            if (convo) {
                const receiverId = convo.members.find(member => member !== sellerId);
                //const receiverId = convo.members[1]; because i have designed members array as 0 is teacherId and 1 is STudentId
                //console.log('recieverIdnull :',recieverId);
                //console.log('recieverId: ',receiverId);
                setRecieverId(receiverId);
            }
        }
    };
    const latestMsgRef = useRef();
    const [chatListLoading, setchatListLoading] = useState(true);
    const [messageListLoading, setMessageListLoading] = useState(true);

    useEffect(() => {
        if (latestMsgRef.current) {
            latestMsgRef.current.scrollTop = latestMsgRef.current.scrollHeight;
        }
    }, [message]);
    const handleEmojiClick = (emojiObject) => {
        const emoji = emojiObject.emoji;
        setInputValue((prevValue) => prevValue + emoji);
        setShowEmojiPicker(false);
    };



    const handleEmojiPickerClick = (e) => {
        e.stopPropagation();
    };

    const handleDocumentClick = (e) => {
        if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
            setShowEmojiPicker(false);
        }
    };

    useEffect(() => {
        if (showEmojiPicker) {
            document.addEventListener("click", handleDocumentClick);
        }

        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, [showEmojiPicker]);

    const emojiPickerRef = useRef();

    const filteredChatList = conversations?.map(conversation => ({
        id: conversation._id,
        title: conversation.buyerName,
        subtitle: 'Message placeholder',
        avatar:  conversation.buyerProfilePicture,
        alt: 'default-user.jpg',
        date: new Date(),
    })).filter(message => message.title.toLowerCase().includes(searchKeyword.toLowerCase()));


    const handleSend = async () => {
        try {
        console.log('localstorage: ',localStorage);
            if (!selectedChat) {
                console.log('please select a chat');
                toast.error('Please select a chat');
                return;
            }

            if (!inputValue.trim()) {
                console.log("Input value is empty");
                toast.error('Please enter a message');
                return;
            }

            //const senderId = localStorage.getItem("userId");
            // socket?.emit('sendMessage', { 
            //   conversationId : selectedChat.id, 
            //   senderId : senderId, 
            //   recieverId:recieverId,
            //   text: inputValue.trim(), 
            //   type: 'text', 
            //   date: new Date() });

            // const messageData = {
            //     recipientId: selectedChat.id,
            //     senderId: senderId,
            //     text: inputValue.trim(),
            //     type: "text",
            //     date: new Date(),
            // };
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
            //socket.emit('sendMessage', messageData);
            setInputValue('');
            const newMessage = {
              position: "right",
              type: "text",
              text: inputValue.trim(),
              date: new Date(),
            };
            setMessages(prevMessages => [...prevMessages, newMessage]);
            toast.success('Message sent successfully');
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Failed to send message. Please try again later.');
        }
    };

    return (
        <>
            <div className="row msg-page-container">
                <div className="chatList">
                    <input
                        className="searchUser"
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        style={{marginRight:'7px'}}

                    />
                    {chatListLoading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <Spinner />
                        </div>
                    ) : (
                        filteredChatList.length > 0 ? (
                            <ChatList
                                className="chat-list"
                                dataSource={filteredChatList}
                                onClick={(chat) => onSelectChat(chat)}
                                activeChat={selectedChat}
                            />
                        ) : (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90%' }}>
                                <strong>No Contact Found</strong>
                            </div>
                        )
                    )}

                </div>
                <div style={{ flex: 1 }}>
                    {selectedChat ?
                        <>
                            <div className="row" style={{ borderBottom: "2px solid #ccc" }}>
                                <div className="avatar col-1" style={{marginLeft: '20px'}}>
                                    {selectedChat.avatar ? (
                                        <img height={40} width={40}  src={`http://localhost:5000/uploads/${selectedChat.avatar}`} alt="Profile" />
                                    ) : (
                                        selectedChat.title[0]
                                    )}
                                </div>
                                <div className=" col-5"
                                    style={{
                                        paddingTop: '7px',
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        paddingBottom: "10px",
                                        marginBottom: "10px",
                                        position: "relative"
                                    }}
                                >
                                    <strong >{selectedChat.title}</strong>
                                </div>
                            </div>

                            <div className="message-body" ref={latestMsgRef} style={{ scrollBehavior: 'smooth', height: 'calc(60vh - 20px)', maxHeight: '500px' }} >
                                {messageListLoading ? (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                    <Spinner />
                                </div>) : (<MessageList className="message-list" style={{ maxWidth: '80%', overflow: 'hidden' }} dataSource={message} />)}
                            </div>
                            <div className="row row-message-input" style={{marginLeft: 'auto',marginTop:'17px'}} >
                                <div className="col " style={{ position: "relative" }} ref={emojiPickerRef} >
                                    <Button
                                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                        color="white"
                                        backgroundColor="white"
                                        text="😀"
                                    />
                                    {showEmojiPicker && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "-305px",
                                                left: "50%",
                                                transform: "translateX(-50%)",
                                                zIndex: 1000,
                                            }}
                                            onClick={handleEmojiPickerClick}
                                        >
                                            <EmojiPicker
                                                onEmojiClick={handleEmojiClick}
                                                disableSearchBar
                                                disableSkinTonePicker
                                                disableAutoFocus
                                                theme="auto"
                                                suggestedEmojisMode="recent"
                                                width={250}
                                                height={300}
                                                searchDisabled="true"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="col-10">
                                    <Input
                                        className="custom-input"
                                        placeholder="Type here..."
                                        multiline={false}
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}

                                        rightButtons={[
                                            <Button
                                                key="sendButton"
                                                color="white"
                                                backgroundColor="#007BFF"
                                                text="Send"
                                                onClick={handleSend}
                                            />,
                                        ]}
                                    />
                                </div>
                            </div>
                        </>
                        :
                        <div className="nochat-container" style={{ marginTop: '30px' }}>
                            <img className="chatting-pic" src="/assets/img/chat.png" />
                            <p className="text-pic">Pick up where you left off</p>
                            <p className="down-pic">Select a conversation and chat away.</p>
                        </div>
                    }
                </div>


            </div>

        </>
    )
}