import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function RentListings() {

    const [properties, setProperties] = useState([]);

    useEffect(() => {
      fetchRentProperties();
    }, []);
  
  
    const fetchRentProperties = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('http://localhost:5000/getlistingrent', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
    
        setProperties(response.data.properties);
        console.log(response);
      } catch (error) {
        console.error('Error fetching rent properties:', error);
      }
    }

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
    <div className="row">
      {properties.map(property => (
        <div className="col-lg-5 col-md-6" key={property._id}>
          <div className="single-product-wrap style-1">
            <div className="thumb">
              <img
                style={{ width: "330px", height: "248px" }}
                src={handleImageSrc(property.MainImage)}
                alt="img"
              />
              <div className="product-wrap-details">
                <div className="media">
                  <div className="media-body">
                    <h6>{property.Owner}</h6>
                    <p>
                      <img
                        src={publicUrl + "assets/img/icon/location-alt.png"}
                        alt="img"
                      />
                      {property.Address}
                    </p>
                  </div>
                  <a className="fav-btn float-right" href="#">
                    <i className="far fa-heart" />
                  </a>
                </div>
              </div>
            </div>
            <div className="product-details-inner">
              <h4>{property.PropertyTitle}</h4>
              <ul className="meta-inner">
                <li>
                  <img
                    src={publicUrl + "assets/img/icon/location2.png"}
                    alt="img"
                  />
                  {property.City}
                </li>
                <li>For Rent</li>
              </ul>
              <p>{property.PropertyTagline}</p>
              <span className="price">$ {property.Price}</span>
            </div>
            <div className="product-meta-bottom style-2">
              <span>{property.Bedrooms} Bedrooms</span>
              <span className="border-none">{property.Bathrooms} Bathrooms </span>
              <span>{property.AreaSqFt} sqft</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
