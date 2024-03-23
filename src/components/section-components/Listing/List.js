import React from 'react'
import Heading from "./../../ui/Heading";
import Row from "./../../ui/Row";
import AddListing from './AddListing';

export default function List() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h2">Add Listing For Sale</Heading>
      </Row>

      <AddListing/>
      </>
  )
}
