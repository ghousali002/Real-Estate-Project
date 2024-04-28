import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BuyerHeader from '..//../ui/BuyerHeader';

const BuyerBookings = () => {
  const [bookedProperties, setBookedProperties] = useState([]);

  useEffect(() => {
    const fetchBookedProperties = async () => {
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

        const propertyDetailsPromises = bookedSaleProperties.map(propertyId =>
          axios.get(`http://localhost:5000/SalePropertyDetail/property-details-sale/${propertyId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        );

        const propertyDetailsResponses = await Promise.all(propertyDetailsPromises);

        const properties = propertyDetailsResponses.map(res => res.data);
        const uniqueProperties = filterUniqueProperties(properties);

        setBookedProperties(uniqueProperties);
      } catch (error) {
        console.error('Error fetching booked properties:', error);
      }
    };

    fetchBookedProperties();
  }, []);

  const filterUniqueProperties = (properties) => {
    const uniquePropertyIds = new Set();
    const uniqueProperties = [];

    properties.forEach(property => {
      if (!uniquePropertyIds.has(property._id)) {
        uniquePropertyIds.add(property._id);
        uniqueProperties.push(property);
      }
    });

    return uniqueProperties;
  };

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
    <div>
            <BuyerHeader />

      <ul>
      <div className="blog-page-area go-top">
      <h5 style={{marginLeft:"5px",background:"#22F550",color:"white",width:"200px",padding:"10px 10px",borderRadius:"10px"}}>Booked Properties</h5>

        <div className="container ">

          <div className="row justify-content-center">

        {bookedProperties.map(property => (
          <>
         
          <div className="col-lg-4 col-md-6 pt-5">
          <div className="single-product-wrap style-2">
            <div className="thumb">
              <img
                style={{ width: "330px", height: "248px" }}
                src={handleImageSrc(property.MainImage)}
                alt="img"
              />
              <div className="product-wrap-details">
                <div className="media">
                  <div className="media-body">
                    <h6>
                        {property.Owner}
                    </h6>
                    <p>
                      <img
                        src={publicUrl + "assets/img/icon/location-alt.png"}
                        alt="img"
                      />
                      {property.Address}{" "}
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
                {property.PropertyTitle}
              </h4> 
              <ul className="meta-inner">
                <li>
                  <img
                    src={publicUrl + "assets/img/icon/location2.png"}
                    alt="img"
                  />
                  {property.City}
                </li>
                
              </ul>
              <p>{property.PropertyTagline}</p>
              <span className="price">$ {property.Price}</span>
            </div>
            <div className="product-meta-bottom style-2">
              <span>
                {property.Bedrooms} <span>Bedrooms</span>
              </span>
              <span className="border-none">
                {property.Bathrooms} <span>Bathrooms </span>
              </span>
              <span>
                {" "}
                {property.AreaSqFt} <span>sqft</span>
              </span>
            </div>
            
            <div> 
            <ul className="meta-inner">
            <li  style={{background:"red",color:"white",padding:"0 10px",fontWeight:"bold",width:"80px",borderRadius:"4px",margin:"0px",cursor:"pointer"}}>
    Booked
  </li>
              </ul>
            </div>
          </div>
      </div>
          </>
        ))}
          </div>
        </div>
      </div>
      </ul>
    </div>
  );
};

export default BuyerBookings;
