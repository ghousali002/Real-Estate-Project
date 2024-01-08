import React, {useEffect, useState} from "react";
import toast from "react-hot-toast";
import Navbar from "./global-components/navbar";
import Banner from "./section-components/banner";
import Service from "./section-components/service";
import Video from "./section-components/video"; 
import Testimonial from "./section-components/testimonial";
import Team from "./section-components/team";
import FooterV2 from "./global-components/footer-v2";
import { useNavigate, useLocation } from "react-router-dom";

const Home_V1 = () => {

  const location = useLocation();
  const [toastShown, setToastShown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const isVerified = searchParams.get("isVerified");
    
    // Check if isVerified is true or false
    if (isVerified === "true" && !toastShown) {
      setTimeout(() => {
        console.log("Showing toast");
        toast.success("Email Verified Successfully");
        // Clear the query parameter after showing the toast
        navigate("/", { replace: true });
        setToastShown(true);
      }, 0);
    } else if (isVerified === "false" && !toastShown) {
      setTimeout(() => {
        console.log("Showing error toast");
        toast.error("Email verification pending");
        setToastShown(true);
      }, 0);
    } else {
      console.log("No valid isVerified value found or toast already shown");
    }
  }, [location.search, navigate, toastShown]);

  return (
    <div>
      <Navbar />
      <Banner />
      <Service />
      <Video />
      <Testimonial />
      <Team />
      <FooterV2 />
    </div>
  );
};

export default Home_V1;
