import React from 'react'
import Heading from "./../../ui/Heading";
import Row from "./../../ui/Row";
import AddListingRent from './AddListingRent';

export default function List() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h2">Add Listing For Rent</Heading>
      </Row>

      <AddListingRent/>
      </>
  )
}
