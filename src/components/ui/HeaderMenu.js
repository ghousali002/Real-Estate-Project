import React from "react";
import styled from "styled-components";
import Notificationbox from './Notificationbox';
import Logout from './Logout';

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
  text-decoration: none;
  list-style: none;
`;

export default function HeaderMenu() {
  return (
    <StyledHeaderMenu>
      <li>
        <Notificationbox />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}
