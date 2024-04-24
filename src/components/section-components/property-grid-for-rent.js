import React, { useState, useEffect } from "react";
import PropertyCard from "./property-card-rent";
import axios from "axios";
import toast from "react-hot-toast";
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css';

function PropertyGridForRent() {
  const [rentProperties, setRentProperties] = useState([]);
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [location, setLocation] = useState(null);
  const [property, setProperty] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    setSearchEnabled(location || property || minPrice || maxPrice);
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
      return;
    } else if ((minPrice && minPrice <= 0) || (maxPrice && maxPrice <= 0)) {
      toast.error('Min and Max Price must be positive');
      return;
    } else if (minPrice && maxPrice && minPrice >= maxPrice) {
      toast.error('Max Price must be greater than Min Price');
      return;
    }

    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (property) params.append('property', property);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);
    
    axios.get("http://localhost:5000/RentPropertyDetail/", { params })
      .then((response) => {
        if (response.data.length === 0) {
          toast.error("No data found");
          setRentProperties(response.data);

        } else {
          setRentProperties(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('An error occurred while fetching data');
      });
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
                    <h5>{rentProperties.length} Properties</h5>
                  </div>
                  <div className="main-search-inner col-md-10" style={{ border: "2px solid #ccc", borderRadius: '5px', padding: '5px' }}>
                    <div className="row custom-gutters-6">
                      <div className="col-md-3">
                        <SelectSearch
                          options={[
                            { name: 'Lahore', value: 'lahore' },
                            { name: 'Kampala', value: 'Kampala' },
                            { name: 'Islamabad', value: 'islamabad' },
                            { name: 'Faisalabad', value: 'faisalabad' },
                            { name: 'Karminagar', value: 'Karminagar' },
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
                          style={{ width: '100%', paddingRight:'12px',  padding: '5px', border: '1px solid #ccc', borderRadius: '3px' }}
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
                        <div className="btn btn-base w-100" disabled={!searchEnabled} onClick={handleSearch}>
                          <i className="fa fa-search mr-1" /> Search
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {rentProperties.map((property) => {
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

export default PropertyGridForRent;
