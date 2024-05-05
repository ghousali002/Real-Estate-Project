import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';
import toast from "react-hot-toast";



const SaleCard = ({
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
  propertySallerId,
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

        const { bookedSaleProperties } = response.data.user;
        setIsBooked(bookedSaleProperties.includes(PropertyId));
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
      const response = await axios.post(`http://localhost:5000/buyer/book-property/${userId}`, {
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

  const navigate = useNavigate();
  const handleOpenChat = async (PropertyId, propertySallerId) => {
    
    const buyerId = localStorage.getItem('userId');
    try {
      console.log("PropertyId, Sellerid, Buyer id :");
      console.log(PropertyId, propertySallerId, buyerId);
      
      const response = await fetch('http://localhost:5000/createConversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ PropertyId, propertySallerId, buyerId }),
      });

      if (response.ok) {
        const data = await response.json();
        //const conversationId = data._id;
        const PropertyId = data.PropertyId;
        //navigate(`/dashboardlinks/Message/${conversationId}`, { state: { PropertyId } });
        navigate(`/dashboardlinks/Message`, { state: { PropertyId } });

      }
      else{
        throw new Error('Seller or Buyer Id missing ');;
      }
    } catch (error) {
      toast.error('Error creating conversation:', error.message);

      console.error('Error creating conversation:', error.message);
    } finally {
      //setLoading(false);
    }
  }
  return (
    <>
      <div className="col-lg-4 col-md-6">
        {/* <Link to="/property-details-sale" state={PropertyId}> */}
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
              <li style={{ background: "#5BA600", color: "white", padding: "0 20px" }}>
                For Sale
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
                <li style={{ background: "red", color: "white", padding: "0 10px", fontWeight: "bold", width: "160px", borderRadius: "4px", margin: "0px" }}>
                  Already Booked
                </li>
              ) : (
                <li onClick={() => makePayment(PropertyId, Price)} style={{ background: "#56C7F2", color: "black", padding: "0 10px", fontWeight: "bold", width: "160px", borderRadius: "4px", margin: "0px", cursor: "pointer" }}>
                  Book This House
                </li>
              )}
            </ul>
          </div>
          <div className="btnSendMessage">
            <button onClick={() => handleOpenChat(PropertyId, propertySallerId)} className="btn hov-btn" style={{ background: 'white', height: 40, border: '2px solid #ccc',   margin: 'auto 40px', marginBottom: '7px', borderRadius: '10px', width: '70%' }}>
              <span >Send Message</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

SaleCard.propTypes = {
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
  propertySallerId: PropTypes.string.isRequired,
};

export default SaleCard;
