import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const RentCard = ({
  PropertyId,
  PropertyTitle,
  PropertyTagline,
  Address,
  City,
  Price, //Needs to be formatted or changed
  MainImage,
  Bedrooms,
  Bathrooms,
  AreaSqFt,
  Owner,
}) => {
  const [isBooked, setIsBooked] = useState(false);

  
  useEffect(() => {
    const checkIfBooked = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await axios.get('http://localhost:5000/buyer/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const { bookedRentProperties } = response.data.user;
        setIsBooked(bookedRentProperties.includes(PropertyId));
      } catch (error) {
        console.error('Error checking booked properties:', error);
      }
    };

    checkIfBooked();
  }, [PropertyId]);



  const makePayment = async (propertyId, paymentAmount) => {
    const userId = localStorage.getItem('userId');
    
    console.log("this is property id:", propertyId);

    try {
      // Check if userId is available
      if (!userId) {
        throw new Error('User ID not found in local storage');
      }

      // Send request to backend to update user's bookedSaleProperties
      const response = await axios.post(`http://localhost:5000/buyer/book-property-rent/${userId}`, {
        propertyId: propertyId
      });

      console.log(response); // Log the response from the backend

      // Process payment logic with Stripe
      const stripePromise = loadStripe("pk_test_51Obp44KAlnAzxnFUz8GK3HrpVPY0RkdVZQlKOn7tYAuf5t6LmioU2tdpYEy44MfglP2c4ih8yUiOmOdwJIgLfD7K00s65yhj9D");
      const stripe = await stripePromise;
      
      const body = {
        paymentAmount: paymentAmount,
      };

      const headers = {
        "Content-Type": "application/json",
      };

      const paymentResponse = await fetch("http://localhost:5000/buyer/payment", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      const session = await paymentResponse.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.session.id,
      });

    } catch (error) {
      console.error("Error making payment:", error);
      // Handle errors as needed (e.g., show error message to user)
    }
  };

  // Like button to be implmented
  let publicUrl = process.env.PUBLIC_URL + "/";

     // Function to handle image source
     const handleImageSrc = (imagePath) => {
      // Check if imagePath is undefined or null
      if (!imagePath) {
          // Return a default image or handle the undefined case as needed
          console.log("Image path is undefined or null.");
          return '/path/to/default/image.png'; // Adjust this path to your default image
      }
  
      // Check if imagePath starts with "http" or "https"
      if (imagePath.startsWith('http')) {
          console.log(imagePath);
          return imagePath; // Return the URL as-is
      } else {
          console.log(imagePath);
          // Assuming your server is set up to serve images from the 'uploads' directory
          const baseUrl = "http://localhost:5000/"; // Adjust this URL to match your server's configuration
          return baseUrl + imagePath.replace(/\\/g, '/'); // Replace backslashes with forward slashes if necessary
      }
  };  

  return (
    <>
      <div className="col-lg-4 col-md-6">
          <div className="single-product-wrap style-2">
            <div className="thumb">
              <img
                style={{ width: "330px", height: "248px" }}
                src={handleImageSrc(MainImage)}
                alt="img"
              />
              <div className="product-wrap-details">
                <div className="media">
                  <div className="media-body">
                    <h6>
                        {Owner}
                    </h6>
                    <p>
                      <img
                        src={publicUrl + "assets/img/icon/location-alt.png"}
                        alt="img"
                      />
                      {Address}{" "}
                    </p>
                  </div>
                  <a className="fav-btn float-right" href="#">
                    <i className="far fa-heart" />
                  </a>
                </div>
              </div>
            </div>
            <div className="product-details-inner">
              <h4>
                {PropertyTitle}
              </h4>
              <ul className="meta-inner">
                <li>
                  <img
                    src={publicUrl + "assets/img/icon/location2.png"}
                    alt="img"
                  />
                  {City}
                </li>
                <li style={{background:"#5BA600",color:"white",padding:"0 20px"}}>
                  For Rent
                </li>
              </ul>
              <p>{PropertyTagline}</p>
              <span className="price">$ {Price}</span>
            </div>
            <div className="product-meta-bottom style-2">
              <span>
                {Bedrooms} <span>Bedrooms</span>
              </span>
              <span className="border-none">
                {Bathrooms} <span>Bathrooms </span>
              </span>
              <span>
                {" "}
                {AreaSqFt} <span>sqft</span>
              </span>
            </div>
            <div> 
            <ul className="meta-inner">
            {isBooked ? (
              <li style={{background:"red",color:"white",padding:"0 10px",fontWeight:"bold",width:"160px",borderRadius:"4px",margin:"0px"}}>
                Already Booked
              </li>
            ) : (
              <li onClick={() => makePayment(PropertyId, Price)} style={{background:"#56C7F2",color:"black",padding:"0 10px",fontWeight:"bold",width:"160px",borderRadius:"4px",margin:"0px",cursor:"pointer"}}>
                Book This House
              </li>
            )}
              </ul>
            </div>
          </div>
      </div>
    </>
  );
};

RentCard.propTypes = {
  PropertyId: PropTypes.string.isRequired,
  PropertyTitle: PropTypes.string.isRequired,
  PropertyTagline: PropTypes.string.isRequired,
  Address: PropTypes.string.isRequired,
  City: PropTypes.string.isRequired,
  Price: PropTypes.number.isRequired,
  MainImage: PropTypes.string.isRequired,
  Bedrooms: PropTypes.number,
  Bathrooms: PropTypes.number,
  AreaSqFt: PropTypes.number.isRequired,
  Owner: PropTypes.string.isRequired,
};

export default RentCard;
