import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

const Banner = () => {
  const [location, setLocation] = useState(null);
  const [property, setProperty] = useState(null);
  const [price, setPrice] = useState(null);

  const handleLocationChange = (e) => {
    console.log(e.target.value);
    setLocation(e.target.value === "Location" ? null : e.target.value);
  };

  const handlePropertyChange = (e) => {
    console.log(e.target.value);
    setProperty(e.target.value === "Property" ? null : e.target.value);
  };

  const handlePriceChange = (e) => {
    console.log(e.target.value);
    setPrice(e.target.value === "Price" ? null : e.target.value);
  };

  const isSearchEnabled = () => {
    return location || property || price;
  };

  let publicUrl = process.env.PUBLIC_URL + "/";

  return (
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
                  <div className="col-md-3">
                    <div className="single-select-inner">
                      <select
                        value={location || "Location"}
                        onChange={handleLocationChange}
                      >
                        <option disabled value="Location">Location</option>
                        <option value="Lahore">Lahore</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Multan">Multan</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="single-select-inner">
                      <select
                        value={property || "Property"}
                        onChange={handlePropertyChange}
                      >
                        <option disabled value="Property">Property</option>
                        <option value="Apartments">Apartments</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Villas">Villas</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="single-select-inner">
                      <select
                        value={price || "Price"}
                        onChange={handlePriceChange}
                      >
                        <option disabled value="Price">Price</option>
                        <option value="Rs.(0.5-1.0) Crore">Rs.(0.5-1.0) Crore</option>
                        <option value="Rs.(1.0-2.0) Crore">Rs.(1.0-2.0) Crore</option>
                        <option value="Rs.(2.0-5.0) Crore">Rs.(2.0-5.0) Crore</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    {isSearchEnabled() ? (
                      <Link
                        to={`/property-for-sale?location=${location || ""}&property=${property || ""}&price=${price || ""}`}
                        className="btn btn-base w-100"
                      >
                        <i className="fa fa-search mr-1" /> Search
                      </Link>
                    ) : (
                      <button
                        className="btn btn-base w-100"
                        disabled
                      >
                        <i className="fa fa-search mr-1" /> Search
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
