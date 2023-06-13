import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function DeckPreview({ deckId, deckName, cardImage }) {
  const defaultImage = "https://i.ibb.co/R6t83fW/blank-Card.png";

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      navigate(`/deck/${deckId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Col xs={12} sm={6} md={4} className="mb-4 border">
      <div className="shadow-lg rounded-lg mt-4 border-2 border-[#FFEC99] p-3">
        <div className="h-full flex flex-col justify-between ">
          
            <img className="hover:scale-150 mt-4" src={cardImage ? cardImage : defaultImage} alt={deckName} />
            <h3 className="mb-2 truncate text-center mt-2 text-white bg-[#0B3C49] rounded p-1 text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">{deckName}</h3>
          
          <button
            onClick={handleClick}
            className="bg-[#AFD7CA] hover:bg-[#FFEC99] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
          >
            View Deck
          </button>
        </div>
      </div>
    </Col>
  );
}

export default DeckPreview;


