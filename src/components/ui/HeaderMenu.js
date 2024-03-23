import styled from "styled-components"
import { HiOutlineBell } from "react-icons/hi";
import ButtonIcon from './ButtonIcon';
import Logout from './Logout';
import React from "react";

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
        <ButtonIcon>
         <HiOutlineBell />
        </ButtonIcon>
     </li>
     <li>
        <Logout/>
    </li>

   </StyledHeaderMenu>
  )
}