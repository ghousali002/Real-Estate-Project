import React from 'react'
import BuyerHeader from '..//../ui/BuyerHeader';
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { useState } from "react";
import './MessageSidebar.css';
import PropTypes from 'prop-types';
import BuyerMessageWindow from "./BuyerMessageWindow";
import { useEffect } from 'react';
import toast from "react-hot-toast";

import { Spinner } from "react-bootstrap";


const ChatItem = ({ name, messagePreview, timeAgo, profilePic, onClick, activeChat }) => (
  <div className={`chat-item ${activeChat ? 'active-chat' : ''}`} onClick={onClick}>
    <div className="avatar" style={{marginTop: '8px'}}>
      {profilePic !== 'null' ? (
        <img height={60} width={60} style={{ borderRadius: '50%', maxWidth: '100%',filter: 'none' }} src={`http://localhost:5000/uploads/${profilePic}`} alt="Profile" />
      ) : (
        name[0]
      )}
    </div>
    <div className="chat-info">
      <h2 className="chat-name">{name}</h2>
      <p className="chat-preview">{messagePreview}</p>
    </div>
    <span className="chat-time">{timeAgo}</span>
  </div>
);

export default function BuyerMessage() {
  const [loading, seatLoading] = useState(true);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState([]);
  const [recieverId, setRecieverId] = useState(null)

  useEffect(() => {
    const buyerId = localStorage.getItem('userId');
    const fetchConversations = async () => {
      try {
        const response = await fetch(`http://localhost:5000/BuyerConversations/${buyerId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch conversations');
        }
        const data = await response.json();
        console.log('Coversations: ',data);
        setConversations(data);
      } catch (error) {
        toast.error(error);
        console.error(error);

      } finally {
        seatLoading(false);
      }
    };

    fetchConversations();
  }, []);


  const filteredMessages = conversations.map(conversation => ({
    id: conversation._id,
    name: `${conversation.buyerName}`,
    time: 'Time placeholder',
    messagePreview: 'Message placeholder',
    profilePic: conversation.buyerProfilePicture,
  })).filter(message => message.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const selectedChatMessages = filteredMessages.filter((message) => message.id === selectedChatId);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const fetchMessages = async (conversationId) => {
    try {
      const userId = localStorage.getItem('userId');
      const url = `http://localhost:5000/messages/${conversationId}?userId=${userId}`;
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
      toast.error('Error fetching messages:',error);
      console.error('Error fetching messages:', error);
      throw error;
    } finally{
      //setMessageListLoading(false);
    }
  };

  const handleChatClick = (chatId) => {
    if (chatId !== selectedChatId) {
      setSelectedChatId(chatId);
      fetchMessages(chatId);
      const convo = conversations.find(chat => chat._id === chatId);
      //console.log('convo:',convo);
      if (convo) {
        const userId = localStorage.getItem('userId');
        
        const receiverId = convo.members.find(member => member !== userId);
        //const receiverId = convo.members[1]; because i have designed members array as 0 is sellerId and 1 is buyerId
        //console.log('recieverIdnull :',recieverId);
        //console.log('recieverId: ',receiverId);
        setRecieverId(receiverId);
      }
    }
  };
  const [messages, setMessages] = useState([]);
  return (
    <>
      <BuyerHeader />
      <div className='container' style={{paddingBottom:'10px'}}>
      <Row type="horizontal">
        <Heading as="head1">My Chats</Heading>
      </Row>
      <div className="row-horizontal" style={{marginTop:'7px'}}>
        <div className="message-sidebar">
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearchChange}
            value={searchQuery}
            className="search-input"
          />
          {loading ? <div style={{  height: '100%' }}>
            <Spinner />
          </div> :
           <ul className="chat-list">
           {filteredMessages.length === 0 ? (
             <div className="no-contact"  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%',fontWeight:'bold' }}>No contact found</div>
           ) : (
             filteredMessages.map((message) => (
               <ChatItem
                 key={message.id}
                 name={message.name}
                 messagePreview={message.messagePreview}
                 timeAgo={message.time}
                 profilePic={message.profilePic}
                 onClick={() => handleChatClick(message.id)}
                 activeChat={message.id === selectedChatId}
               />
             ))
           )}
         </ul>
          }
        </div>
        <div className="message-window-container">
          {selectedChatId ? (
            <BuyerMessageWindow
              messages={messages} selectedChatId={selectedChatId} recieverId={recieverId}
              activeConversation={selectedChatMessages[0].name}
              lastSeen="April 10, 10:45 AM"
              setMessages={setMessages}
              //socket={socket}
            />
          ) : (
            <div className="nochat-container" style={{marginTop:'35px',height:500}}>
              <img className="chatting-pic" src="/assets/img/chat.png" />
              <p className="text-pic" style={{marginTop:'7px'}}>Pick up where you left off</p>
              <p className="down-pic" style={{marginTop:'7px'}}>Select a conversation and chat away.</p>
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  )
}

ChatItem.propTypes = {
  name: PropTypes.string.isRequired,
  messagePreview: PropTypes.string.isRequired,
  timeAgo: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  activeChat: PropTypes.string.isRequired,
  profilePic: PropTypes.string,
};
