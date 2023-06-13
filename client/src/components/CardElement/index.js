import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_TO_DECK, ADD_LISTING } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { useNavigate } from 'react-router-dom';


function CardElement({ cardId, cardImage, cardName, cardType, superType, deckId, createListing}) {
  const [addToDeck] = useMutation(ADD_TO_DECK);
  const [addListing] = useMutation(ADD_LISTING);
  const [price, setPrice] = useState('');
  const token = Auth.getToken();
  const user_name = token ? Auth.getProfile().data.username : null;
  const navigate = useNavigate();

  const handleAddToDeck = async () => {
    try {
      const response = await addToDeck({
        variables: {
          deckId: deckId,
          cardId: cardId,
          cardName: cardName,
          cardImage: cardImage,
          cardType: cardType,
          superType: superType,
        },
      });
      // Handle the response if needed
      console.log(response);
      window.location.reload();
    } catch (error) {
      // Handle the error if needed
      console.error(error);
    }
  };

  const handleCreateListing = async () => {
    try {
      const response = await addListing({
        variables: {
          cardId: cardId,
          cardName: cardName,
          cardImage: cardImage,
          cardType: cardType,
          superType: superType,
          price: parseFloat(parseFloat(price).toFixed(2)),
          seller: user_name,
        },
      });
      console.log(response);
      navigate(`/marketplace`);
  
    } catch (error) {
      console.error(error);
    }
  };
  

  const renderButtons = () => {
    if (createListing) {
      return (
        <div className="text-center">
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="text-center p-2 m-2 rounded bg-[#AFD7CA] text-black"
          />
          <button onClick={handleCreateListing} className="bg-[#AFD7CA] hover:bg-[#FFEC99] text-black p-2 m-2 rounded">
            Create Listing
          </button>
        </div>
      );
    } else {
      return (
        <div className="text-center">
          <button className="bg-[#AFD7CA] hover:bg-[#FFEC99] text-black p-2 m-2 rounded" onClick={handleAddToDeck}>
            Add to Deck
          </button>
        </div>
      );
    }
  };

  return (
    <div key={cardId} className="shadow-lg rounded">
      <img src={cardImage} alt={cardName} className="hover:scale-150 mt-4" />
      <h3 className="truncate text-center mt-2 text-white bg-[#0B3C49] rounded p-1 text-sm">{cardName}</h3>
      {renderButtons()}
    </div>
  );
}

export default CardElement;
