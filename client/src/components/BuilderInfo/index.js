import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function BuilderInfo({ deckId, deckName, quantity }) {
  const { _id } = useParams();
  const navigate = useNavigate();
  
  const handlePublish = async () => {
    if (quantity === 60) {
      navigate(`/post/publish/${_id}`);
    } else {
      alert('Your deck must be exactly 60 cards!');
    }
  };

  return (
    <Container>
      <div className="">
        <h3 className="text-center text-4xl text-white underline text-transform: uppercase">{deckName}</h3>
        
        <h3 className="text-center text-white mt-2">{quantity}/60<span className='text-muted'> cards in deck</span></h3>
      </div>

      <Row className="justify-content-center">
        
        <Col className="text-center">
          <button className="bg-[#FFEC99] hover:bg-[#AFD7CA] text-black font-bold p-2 m-2 rounded focus:outline-none focus:shadow-outline" onClick={handlePublish}>
            Publish Deck
          </button>
        </Col>
        
        
      </Row>
    </Container>
  );
}

export default BuilderInfo;
