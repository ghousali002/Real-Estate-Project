// ButtonIcon.js
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaRegEnvelope } from 'react-icons/fa';
import ButtonIcon from './ButtonIcon';

const Badge = styled.span`
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 7px 5px;
  font-size: 12px;
  position: absolute;
  top: 13px;
  right: 85px;
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

const notifications = [
    { id: 1, sender: 'reg1sterrr', message: 'Me: ?', time: '1 month' },
    { id: 2, sender: 'cpplegend', message: 'Will do.', time: '1 month' },
    { id: 3, sender: 'Joseph S @joejoe903', message: 'Me: You will receive your fee back now...', time: '1 month' },
    { id: 4, sender: 'mikko_n', message: 'Me: Oke Thanks', time: '2 months' },
    { id: 5, sender: 'Bilal M @bilalmumtaz_', message: 'Me: Yes bruh', time: '2 months' },
];

export default function Notificationbox() {
    const [isOpen, setIsOpen] = useState(false);
    const [newNotificationCount, setNewNotificationCount] = useState(5);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        setNewNotificationCount(0);
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
    return (
        <div ref={dropdownRef}>
            <ButtonIcon onClick={toggleDropdown}>
                {newNotificationCount > 0 && <Badge>{newNotificationCount}</Badge>}
                <FaRegEnvelope size={18} style={{ color: '#4f46e5' }} />
            </ButtonIcon>

            <DropdownContent isOpen={isOpen} >
                <DropdownHeader>
                    <span>Inbox ({notifications.length})</span>
                </DropdownHeader>
                <DropdownBody>
                    {notifications.map((notification) => (

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

                    ))}
                </DropdownBody>
                <DropdownFooter>
                    <SeeAllLink href="http://localhost:3000/message">See All In Inbox</SeeAllLink>
                </DropdownFooter>
            </DropdownContent>
        </div>
    );
}
