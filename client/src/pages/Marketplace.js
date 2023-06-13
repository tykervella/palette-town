import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_LISTINGS } from '../utils/queries';
import axios from 'axios';
import ProductList from '../components/Listing/index';
import Cart from '../components/Cart';
import CategoryMenu from '../components/CategoryMenu';
import { Container, Row, Col } from 'react-bootstrap';

function Marketplace() {
  const [filteredListings, setFilteredListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('');

  const { loading, error, data } = useQuery(GET_LISTINGS);

  const list = data?.allListings || [];

  if (loading) {
    return <div>Loading...</div>
  };

  // const handleSearch = (query) => {
  //   setSearchQuery(query);
  // };

  // const handleCategoryChange = (category) => {
  //   setSelectedCategory(category);
  // };

  // const handleSort = (option) => {
  //   setSortOption(option);
  // };

  return (
    <Container>
      <Row className="justify-content-md-center justify-content-center">        {/* left column */}
        <Col md={10}>
          <Row xs={1} sm={2} md={4} lg={4} className="g-4">
            {loading ? (
              <p>Loading listings...</p>
            ) : (
              list.map((listing) => (
                <Col key={listing._id} className="mb-4">
                  <ProductList
                    id={listing._id}
                    cardId={listing.cardId}
                    images={listing.cardImage}
                    cardName={listing.cardName}
                    cardType={listing.cardType}
                    price={listing.price}
                  />
                </Col>
              ))
            )}
          </Row>
        </Col>
        {/* right column
        <Col className="">
          <CategoryMenu onSearch={handleSearch} onSort={handleSort} />
        </Col> */}
      </Row>
    </Container>
  );
}

export default Marketplace;
