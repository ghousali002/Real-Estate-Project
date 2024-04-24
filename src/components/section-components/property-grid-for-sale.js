import React, { useState, useEffect } from "react";
import PropertyCard from "./property-card-sale";
import axios from "axios";
import toast from "react-hot-toast";
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css';

import {  useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function PropertyGridForSale() {
  const query = useQuery();

  const [SaleProperties, setSaleProperties] = useState([]);
  const [location, setLocation] = useState(query.get("location") || null);
  const [property, setProperty] = useState(query.get("property") || null);
  const [minPrice, setMinPrice] = useState(query.get("MinPrice") || null);
  const [maxPrice, setMaxPrice] = useState(query.get("MaxPrice") || null);
  const [searchEnabled, setSearchEnabled] = useState(false);

  useEffect(() => {
    if (location || property || minPrice || maxPrice) {
      const params = new URLSearchParams();
      if (location) params.append('location', location);
      if (property) params.append('property', property);
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);
  
      axios
      .get("http://localhost:5000/SalePropertyDetail/", { params })
      .then((response) => {
        if (response.data.length === 0) {
          setSaleProperties(response.data);
          toast.error("No data found");
        } else {
          setSaleProperties(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
    }
  }, []);

  useEffect(() => {
    if (location || property || minPrice || maxPrice) {
      setSearchEnabled(true);
    } else {
      setSearchEnabled(false);
    }
  }, [location, property, minPrice, maxPrice]);

  const handleLocationChange = (selectedValue) => {
    console.log("Selected location:", selectedValue);
    setLocation(selectedValue || null);
  };
  
  const handlePropertyChange = (selectedValue) => {
    
    console.log("Selected Property:", selectedValue);
    setProperty(selectedValue || null);
  };
  
  const handleMinPriceChange = (e) => {
    const selectedValue = e.target.value;
    console.log("Selected MinPrice:", selectedValue);
    setMinPrice(selectedValue || null);
  };
  
  const handleMaxPriceChange = (e) => {
    const selectedValue = e.target.value;
    console.log("Selected MaxPrice:", selectedValue);
    setMaxPrice(selectedValue || null);
  };
  const handleSearch = () => {
    if (!(location || property || minPrice || maxPrice)) {
      toast.error('Please fill at least one field');
    } else if ((minPrice && minPrice <= 0) || (maxPrice && maxPrice <= 0)) {
      toast.error('Min and Max Price must be positive');
    } else if (minPrice && maxPrice && minPrice >= maxPrice) {
      toast.error('Max Price must be greater than Min Price');
    } else {
      // All conditions passed, send parameters to the server
      // Construct the URL with parameters
      const params = new URLSearchParams();
      if (location) params.append('location', location);
      if (property) params.append('property', property);
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);
      console.log('params: ',params)
      // Send the request to the server
      axios.get("http://localhost:5000/SalePropertyDetail/", { params })
        .then((response) => {
          if (response.data.length === 0) {
            toast.error("No data found");
            setSaleProperties(response.data);
          } else {
            setSaleProperties(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error('An error occurred while fetching data',error);
        });
    }
  };
  
  return (
    <>
    <div className="blog-page-area pt-5 go-top">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="product-search-inner bg-main">
              <div className="row custom-gutters-20">
                <div className="col-md-2 align-self-center">
                  <h5>{SaleProperties.length} Properties</h5>
                </div>
                <div className="main-search-inner col-md-10" style={{ border: "2px solid #ccc", borderRadius: '5px', padding: '5px' }}>
                  <div className="row custom-gutters-6">
                    <div className="col-md-3">
                    <SelectSearch
                      options={[
                        { name: 'Lahore', value: 'lahore' },
                        { name: 'Islamabad', value: 'islamabad' },
                        { name: 'Faisalabad', value: 'faisalabad' },
                        { name: 'Multan', value: 'multan' },
                        { name: 'Vijayawada', value: 'Vijayawada' },
                      ]}
                      value={location}
                      onChange={handleLocationChange}
                      search
                      placeholder="Select location"
                    />
                    </div>
                    <div className="col-md-3">
                    <SelectSearch
                      options={[
                        { name: 'Apartments', value: 'House' },
                        { name: 'Commercial', value: 'commercial' },
                        { name: 'Villas', value: 'villas' }
                      ]}
                      value={property}
                      onChange={handlePropertyChange}
                      search
                      placeholder="Select property"
                    />
                      
                    </div>
                    <div className="col-md-2" style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <input
                            className="single-select-inner"
                            type="number"
                            placeholder="Min Price"
                            value={minPrice || ""}
                            onChange={handleMinPriceChange}
                            style={{ width: '100%',paddingRight:'12px',  padding: '5px', border: '1px solid #ccc', borderRadius: '3px' }}
                          />
                    </div>
                    <div className="col-md-2" style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <input
                            className="single-select-inner"
                            type="number"
                            placeholder="Max Price"
                            value={maxPrice || ""}
                            onChange={handleMaxPriceChange}
                            style={{ paddingRight:'12px', padding: '5px', width: '100%', border: '1px solid #ccc', borderRadius: '3px' }}
                          />

                    </div>

                    <div className="col-md-2">
                      <div
        className="btn btn-base w-100"
                        disabled={!searchEnabled}
                        onClick={handleSearch}
                      >
                        <i className="fa fa-search mr-1" /> Search
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="col-md-2 mt-2 mt-md-0 align-self-center">
                  <div className="single-select-inner">
                    <select defaultValue={1} >
                      <option value={1}>Price: High to Low</option>
                      <option value={2}>Price: Low to High</option>
                      <option value={3}>Area: High to Low</option>
                      <option value={4}>Area: High to Low</option>
                    </select>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          {SaleProperties.map((property) => {
            return (
              <PropertyCard
                key={Math.random()}
                PropertyId={property._id}
                PropertyTitle={property.PropertyTitle}
                PropertyTagline={property.PropertyTagline}
                Address={property.Address}
                City={property.City}
                Price={property.Price}
                MainImage={property.MainImage}
                Bedrooms={property.Bedrooms}
                Bathrooms={property.Bathrooms}
                AreaSqFt={property.AreaSqFt}
                Owner={property.Owner}
              />
            );
          })}
        </div>
      </div>
    </div>
    <div style={{ textAlign: 'center' }}>
  <h5 style={{ display: (!location && !property && !minPrice && !maxPrice) ? 'initial' : 'none', color: 'red' }}>Please select the option to search</h5>
</div>
    </>
  );
}

export default PropertyGridForSale;
