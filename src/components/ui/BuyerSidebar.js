import React from "react";
import { NavLink } from 'react-router-dom';
import { FaTh, FaUserAlt } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";
import { SiGoogleclassroom } from "react-icons/si";
import { MdMessage  } from "react-icons/md";


const Sidebar = () => {
  const menuItem = [
    {
      path: "/dashboardlinks/Dashboard",
      name: "Dashboard",
      icon: <FaTh />
    },
    {
      path: "/dashboardlinks/Profile",
      name: "Profile",
      icon: <FaUserAlt />
    },
    {
      path: "/dashboardlinks/Bookings",
      name: "Bookings",
      icon: <GrGroup />
    },
    {
      path: "/dashboardlinks/Listings",
      name: "Listing",
      icon: <SiGoogleclassroom />
    },
    {
      path: "/dashboardlinks/Message",
      name: "Message",
      icon: <MdMessage   />
    },
  ];

  let publicUrl = process.env.PUBLIC_URL + "/";

  return (
    <div className="sidebar">
      <div style={{position:'fixed',height:'100%',width:'200px' ,zIndex:100,background:'linear-gradient(to top, #3661a0, #57cbf5)'}}>
      <div className="top_section">
        <img src={publicUrl + "assets/img/logo2.png"} alt="logo" style={{ height: 60, width: 60, marginTop: 0 }} />
        <h1 style={{ display: "inline-block", font: "initial", margin: 'auto' }} >Voyage Vista</h1>
      </div>
      {
        menuItem.map((item, index) => (
        <NavLink
             to={item.path}
             key={index}
             className={({ isActive }) => isActive ? 'link activeSidebar' : 'link'}
          >
            <div className="icon">{item.icon}</div>
            <div className="link_text">{item.name}</div>
          </NavLink>

        ))
      }
      </div>
    </div>
  );
};

export default Sidebar;