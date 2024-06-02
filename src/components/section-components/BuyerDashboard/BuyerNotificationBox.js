// ButtonIcon.js
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaRegEnvelope } from 'react-icons/fa';
import ButtonIcon from '../../ui/ButtonIcon';
import { ChatList } from "react-chat-elements";
import { Spinner } from "react-bootstrap";
import "react-chat-elements/dist/main.css";
import { toast } from 'react-hot-toast';
import { useBuyerSocket } from '../../services/buyerSocketContext';
import { useNavigate} from 'react-router-dom';



const Badge = styled.span`
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 7px 5px;
  font-size: 12px;
  position: absolute;
  top: 13px;
  right: 48px;
`;

const DropdownContent = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  background-color: white;
  min-width: 300px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  right: 40px;
  top: 50px;

`;

const DropdownHeader = styled.div`
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
`;

const DropdownBody = styled.div`
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;

`;

const NotificationItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
`;

const NotificationSender = styled.div`
  font-weight: bold;
`;

const NotificationMessage = styled.div`
  color: #555;
`;

const NotificationTime = styled.div`
  color: #888;
  font-size: 12px;
`;

const DropdownFooter = styled.div`
  padding: 10px;
  border-top: 1px solid #e0e0e0;
  text-align: center;
`;

const SeeAllLink = styled.a`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// const notifications = [
//     { id: 1, sender: 'reg1sterrr', message: 'Me: ?', time: '1 month' },
//     { id: 2, sender: 'cpplegend', message: 'Will do.', time: '1 month' },
//     { id: 3, sender: 'Joseph S @joejoe903', message: 'Me: You will receive your fee back now...', time: '1 month' },
//     { id: 4, sender: 'mikko_n', message: 'Me: Oke Thanks', time: '2 months' },
//     { id: 5, sender: 'Bilal M @bilalmumtaz_', message: 'Me: Yes bruh', time: '2 months' },
// ];

export default function BuyerNotificationBox() {
  const [conversations, setConversations] = useState([]);
  const socket = useBuyerSocket();
  const BuyerId = localStorage.getItem("buyerId");
  const [chatListLoading, setchatListLoading] = useState(true);
  const [notificationCount, setNotificationCount] = useState(true);
  
  const fetchConversations = async () => {
    try {
      const response = await fetch(`http://localhost:5000/BuyerConversations/${BuyerId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch conversations');
      }
      const data = await response.json();
      setConversations(data);
      console.log("conversations: ", data);

    } catch (error) {
      toast.error(error);
      console.error(error);

    }
    finally {
      setchatListLoading(false);
    }
  };

  useEffect(() => {


    fetchConversations();

  }, []);
  const filteredChatList = conversations?.map(conversation => ({
    id: conversation._id,
    title: conversation.buyerName,
    subtitle: conversation.lastMessage,
    //avatar:  ''+conversation.buyerProfilePicture,
    avatar: `http://localhost:5000/uploads/${conversation.buyerProfilePicture}`,
    alt: 'default-user.jpg',
    date: new Date(conversation.lastMessageDate),
    unread: conversation.unread
  }));
  filteredChatList.forEach(message => {
    const element = document.querySelector(`.rce-citem-body--bottom-title`);
    const statusElement = document.querySelector(`.rce-citem-body--bottom-status`);

    if (statusElement) {
      statusElement.style.backgroundColor = 'red';
      statusElement.style.borderRadius = '50%';
      statusElement.style.marginBottom = 'auto';
    }
    if (element) {
      if (message.unread > 0) {
        element.style.color = 'black';
        element.style.fontWeight = 'bolder';
    
      } else {
        element.style.color = '#979393';
      }
    }
  });
  filteredChatList.sort((a, b) => b.date - a.date);
  useEffect(() => {
    const initialCount = filteredChatList.reduce((count, message) => {
        if (message.unread > 0) {
            return count + 1;
        }
        return count;
    }, 0);
    setNotificationCount(initialCount);
}, [filteredChatList]);

  useEffect(() => {
    if (socket) {

      socket.on('getNotify', msgdata => {
        
        const { type } = msgdata;
        if (type === 'text') {

          const newMessage = {
            position: "left",
            type: msgdata.type,
            text: msgdata.text,
            date: new Date(msgdata.date),
          };
          fetchConversations();
        }
      });
    }
  }, [socket]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    if(!isOpen){
      fetchConversations();
    }
    setIsOpen(!isOpen);
  };

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const navi = useNavigate();
  const handleChatClick = (conversationId) => {
    navi(`/dashboardlinks/Message/${conversationId}`);
};
  return (
    <div ref={dropdownRef}>
      <ButtonIcon onClick={toggleDropdown}>
        {notificationCount > 0 && <Badge>{notificationCount}</Badge>}
        <FaRegEnvelope size={18} style={{ color: '#4f46e5' }} />
      </ButtonIcon>

      <DropdownContent isOpen={isOpen} >
        <DropdownHeader>
          <span>Inbox ({notificationCount})</span>
        </DropdownHeader>
        <DropdownBody>
          {/* {notifications.map((notification) => (

                        <NotificationItem key={notification.id} className='row'>
                            <div className='col-2' >
                                picture

                            </div>
                            <div className='col-10'>
                                <NotificationSender>{notification.sender}</NotificationSender>
                                <NotificationMessage>{notification.message}</NotificationMessage>
                                <NotificationTime>{notification.time}</NotificationTime>
                            </div>
                        </NotificationItem>

                    ))} */}
          {chatListLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Spinner />
            </div>
          ) : (
            filteredChatList.length > 0 ? (
              <ChatList
                className="chat-list"
                dataSource={filteredChatList}
              // onClick={(chat) => onSelectChat(chat)}
              // activeChat={selectedChat}
              onClick={(chat) => handleChatClick(chat.id)}
              />
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90%' }}>
                <strong>No Contact Found</strong>
              </div>
            )
          )}
        </DropdownBody>
        <DropdownFooter>
          <SeeAllLink href="http://localhost:3000/dashboardlinks/Message">See All In Inbox</SeeAllLink>
        </DropdownFooter>
      </DropdownContent>
    </div>
  );
}
