import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function FeaturedListing({ key, listingId, cardName, cardImage, price }) {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      navigate(`/listing/${listingId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Col key={key} xs={12} sm={6} md={4} className="mb-4">
      <div className="mt-4 shadow-lg rounded-lg border-2 border-[#FFEC99] p-4">
        <img className="hover:scale-150 mt-4" src={cardImage} alt={cardName} />
        <h3 className="mb-2 truncate text-center mt-2 text-white bg-[#0B3C49] rounded p-1 text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">{cardName}</h3>
        <h3 className="mb-2 truncate text-center mt-2 text-white bg-[#0B3C49] rounded p-1 text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">${price}</h3>
        <button
            onClick={handleClick}
            className="bg-[#AFD7CA] hover:bg-[#FFEC99] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 whitespace-nowrap"
          >
            See Listing
          </button>
      </div>
    </Col>
  );
}

export default FeaturedListing;




