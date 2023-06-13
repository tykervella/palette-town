import React from 'react';
import ImageSlider from './ImagesSlider';
import { SliderData } from './SliderData';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const TopListings = () => {
  return (
    <Container>
      {/* <h2 className="text-black mb-4 mt-4">Today's Top Listings</h2> */}
      <Row className="shadow-lg justify-content-center">
        <Col xs={12} sm={10} md={8}>
          <div className="top-listing-card border-2 border-[#FFEC99] rounded-md p-4">
            <ImageSlider slides={SliderData} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TopListings;

