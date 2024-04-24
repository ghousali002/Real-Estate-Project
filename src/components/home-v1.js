import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "./global-components/navbar";
//import Banner from "./section-components/banner";
import Service from "./section-components/service";
import Video from "./section-components/video";
import Testimonial from "./section-components/testimonial";
import Team from "./section-components/team";
import FooterV2 from "./global-components/footer-v2";
import { useNavigate, useLocation, Link } from "react-router-dom";

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

  let publicUrl = process.env.PUBLIC_URL + "/";
  return (
    <div>
      <Navbar />
      <div
      className="banner-area banner-area-1 banner-area-bg"
      style={{ background: "url(" + publicUrl + "assets/img/banner/1.png)" }}
    >
      <div className="container">
        <div className="banner-area-inner">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="banner-inner text-center">
                <div className="line" />
                <h2>The Best Way To Find Your Perfect Home</h2>
              </div>
            </div>
            <div className="col-lg-8 mt-4">
              <form className="main-search-inner">
                <div className="row custom-gutters-10">
                  
                  <div className="col-md-5">
                    
                      <Link
                        to={`/property-for-sale?location=lahore&property=commercial&MinPrice=200000&MaxPrice=30000000 `}
                        className="btn btn-base w-100"
                      >
                        <i className="fa fa-search mr-1" /> Find a Perfect Home
                      </Link>
                   
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
      <Service />
      <Video />
      <Testimonial />
      <Team />
      <FooterV2 />
    </div>
  );
};

export default Home_V1;
