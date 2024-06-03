import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StarRatingComponent from 'react-star-rating-component';
import BuyerHeader from '../../ui/BuyerHeader';
import Modal from 'react-modal';

const BuyerBookings = () => {
  const [bookedProperties, setBookedProperties] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [review, setReview] = useState({ text: '', rating: 0 });
  const [selectedProperty, setSelectedProperty] = useState(null);

  const starStyle = {
    fontSize: '40px', // Adjust the size as needed
    margin: '5px',   // Adjust the spacing as needed
  };

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

        const { bookedSaleProperties, bookedRentProperties } = response.data.user;

        const salePropertyDetailsPromises = bookedSaleProperties.map(propertyId =>
          axios.get(`http://localhost:5000/SalePropertyDetail/property-details-sale/${propertyId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        );

        const rentPropertyDetailsPromises = bookedRentProperties.map(propertyId =>
          axios.get(`http://localhost:5000/RentPropertyDetail/property-details-rent/${propertyId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        );

        const salePropertyDetailsResponses = await Promise.all(salePropertyDetailsPromises);
        const rentPropertyDetailsResponses = await Promise.all(rentPropertyDetailsPromises);

        const saleProperties = salePropertyDetailsResponses.map(res => ({ ...res.data, type: 'Sale' }));
        const rentProperties = rentPropertyDetailsResponses.map(res => ({ ...res.data, type: 'Rent' }));

        const allProperties = [...saleProperties, ...rentProperties];

        setBookedProperties(allProperties);
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

  const renderPropertyLabel = (type) => {
    return type === 'Sale' ? 'For Sale' : 'For Rent';
  };

  let publicUrl = process.env.PUBLIC_URL + "/";

  const handleImageSrc = (imagePath) => {
    if (!imagePath) {
      console.log("Image path is undefined or null.");
      return '/path/to/default/image.png';
    }
    if (imagePath.startsWith('http')) {
      console.log(imagePath);
      return imagePath;
    } else {
      console.log(imagePath);
      const baseUrl = "http://localhost:5000/";
      return baseUrl + imagePath.replace(/\\/g, '/');
    }
  };

  const openReviewModal = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsModalOpen(false);
    setReview({ text: '', rating: 0 });
    setSelectedProperty(null);
  };

  const handleReviewSubmit = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const buyerId = localStorage.getItem('buyerId'); // Assuming the buyer ID is stored in local storage
      console.log('selectedProperty : ',selectedProperty)
      await axios.post(`http://localhost:5000/review`, {
        propertyId: selectedProperty._id,
        review: review.text,
        rating: review.rating,
        buyerId: buyerId,
        sellerId: selectedProperty.userId 
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      closeReviewModal();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div>
      <BuyerHeader />
      <div className="blog-page-area go-top">
        <h5 style={{ marginLeft: "5px", background: "#22F550", color: "white", width: "200px", padding: "10px 10px", borderRadius: "10px" }}>
          Booked Properties
        </h5>
        <div className="container">
          <div className="row justify-content-center">
            {bookedProperties.map(property => (
              <div className="col-lg-4 col-md-6 pt-5" key={property._id}>
                <div className="single-product-wrap style-2">
                  <div className="thumb">
                    <img
                      style={{ width: "330px", height: "248px" }}
                      src={handleImageSrc(property.MainImage)}
                      alt="Property"
                    />
                    <div className="product-wrap-details">
                      <div className="media">
                        <div className="media-body">
                          <h6>{property.Owner}</h6>
                          <p>
                            <img
                              src={publicUrl + "assets/img/icon/location-alt.png"}
                              alt="img"
                            />{property.Address}
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
                        />{property.City}
                      </li>
                    </ul>
                    <p>{property.PropertyTagline}</p>
                    <span className="price">$ {property.Price}</span>
                  </div>
                  <div className="product-meta-bottom style-2">
                    <span>{property.Bedrooms} <span>Bedrooms</span></span>
                    <span className="border-none">{property.Bathrooms} <span>Bathrooms</span></span>
                    <span>{property.AreaSqFt} <span>sqft</span></span>
                  </div>
                  <div>
                    <ul className="meta-inner">
                      <li style={{ background: "#53BEEB", color: "black", padding: "0 10px", fontWeight: "bold", width: "160px", borderRadius: "4px", margin: "0px", cursor: "pointer" }}>
                        Booked ({renderPropertyLabel(property.type)})
                      </li>
                      <li style={{ border: '2px solid #ccc', marginTop: '10px', marginLeft: 'auto', color: "black", padding: "0 10px", fontWeight: "bold", width: "160px", borderRadius: "4px", margin: "0px", cursor: "pointer" }} onClick={() => openReviewModal(property)}>
                        Give Review
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeReviewModal}
        contentLabel="Review Modal"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '500px',
            borderRadius:"1em"
          }
        }}
      >
        <h2>Give Review</h2>
        <div>
          <textarea
            value={review.text}
            onChange={(e) => setReview({ ...review, text: e.target.value })}
            rows="4"
            cols="50"
            placeholder="Write your review here..."
          />
        </div>
        <div>
          <StarRatingComponent
            name="rating"
            starCount={5}
            value={review.rating}
            onStarClick={(nextValue) => setReview({ ...review, rating: nextValue })}
            renderStarIcon={(index, value) => {
              return (
                <span style={starStyle}>
                  {index <= value ? '\u2605' : '\u2606'} {/* Filled star (★) and empty star (☆) */}
                </span>
              );
            }}
          />
        </div>
        <button className='btn' onClick={closeReviewModal} style={{margin:"0 10px"}}>Cancel</button>
        <button className='btn' onClick={handleReviewSubmit}>Submit</button>
      </Modal>
    </div>
  );
};

export default BuyerBookings;
