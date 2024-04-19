import React, { Component } from "react";
import axios from "axios";
import SaleCard from "./SaleCard";
class SaleProperties extends Component {
  constructor(props) {
    super(props);

    this.state = {
      SaleProperties: [],
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/SalePropertyDetail/")
      .then((response) => {
        if (response.data) {
          this.setState({
            SaleProperties: response.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  

  render() {
    return (
      <div className="blog-page-area pt-5 go-top">
        <div className="container">
          <div className="row justify-content-center">
            {this.state.SaleProperties.map((property) => {
              return (
                <SaleCard
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
    );
  }
}

export default SaleProperties;
