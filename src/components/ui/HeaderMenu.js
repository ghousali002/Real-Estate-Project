import styled from "styled-components"
import { HiOutlineUser } from "react-icons/hi2";
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
         <HiOutlineUser />
        </ButtonIcon>
     </li>
     <li>
        <Logout/>
    </li>

   </StyledHeaderMenu>
  )
}