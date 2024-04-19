import React, { useState } from 'react';
import BuyerHeader from '..//../ui/BuyerHeader';
import SaleProperties from './SaleProperties';
import Button from '@material-ui/core/Button';
import RentProperties from './RentProperties';

export default function BuyerListings() {
  const [listingType, setListingType] = useState('sale');

  const handleButtonClick = (type) => {
    setListingType(type);
  };

  return (
    <div>
      <BuyerHeader />
      <div>
        <Button color={listingType === 'sale' ? 'primary' : 'default'} onClick={() => handleButtonClick('sale')} style={{ marginRight: '20px',marginLeft: '20px',fontSize:"12px" }}>Sale</Button>
        <Button color={listingType === 'rent' ? 'primary' : 'default'} onClick={() => handleButtonClick('rent')} style={{fontSize:"12px"}}>Rent</Button>
      </div>
      <div>
        {listingType === 'sale' ? (
          <SaleProperties />
        ) : (
          <RentProperties />
        )}
      </div>
    </div>
  );
}
