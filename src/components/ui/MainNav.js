import { NavLink } from "react-router-dom"; // Import the Link component from React Router
import styled from "styled-components";
import { HiOutlineHome, HiOutlineCalendarDays, HiOutlineHomeModern, HiOutlineUser, HiOutlineCog6Tooth } from 'react-icons/hi2'
import React from "react";

// Define your styled components
const NavList = styled.ul`
 display: flex;
  flex-direction: column;
  gap: 0.8rem;
  list-style-type: none;
  text-decoration: none;
`;

const StyledLink = styled(NavLink)` // Use the styled(Link) component for routing
  display: flex;
  gap: 1.2rem;
  color: var(--color-grey-600);
  font-size: 1.6rem;
  font-weight: 500;
  padding: 1.2rem 2.4rem;
  transition: all 0.3s;
  text-decoration: none;
  font-family: "Poppins", sans-serif;

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active svg {
    color: var(--color-brand-600);
  }
`;

export default function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledLink to="/dashboard">
            <HiOutlineHome/>
            <span>
            Home
            </span>
          </StyledLink>
        </li>

        <li>
          <StyledLink to="/user">
            <HiOutlineUser />
            <span>
            Profile
            </span>
          </StyledLink>
        </li>

        <li>
          <StyledLink to="/addlistings">
          <HiOutlineHomeModern />
            <span>
            Listings For Sale
            </span>
          </StyledLink>
        </li>

        <li>
          <StyledLink to="/addlistingsrent">
            <HiOutlineHomeModern />
            <span>
          Listing For Rent
            </span>
          </StyledLink>
        </li>

        <li>
          <StyledLink to="/alllistings">
            <HiOutlineHomeModern />
            <span>
          All Listings
            </span>
          </StyledLink>
        </li>

        <li>
          <StyledLink to="#">
            <HiOutlineCog6Tooth />
            <span>
           Messages
            </span>
          </StyledLink>
        </li>
      </NavList>
    </nav>
  );
}
