import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_CARD_QUANTITY, REMOVE_CARD } from '../../utils/mutations';

function DeckElement({
  deckId,
  cardId,
  cardImage,
  cardName,
  superType,
  quantity,
  counter,
  onUpdateQuantity,
  updateTotalQuantity, // Receive the function from DeckBuilder
}) {
  const [value, setValue] = useState(quantity);

  const [updateCardQuantity] = useMutation(UPDATE_CARD_QUANTITY);
  const [removeCard] = useMutation(REMOVE_CARD);

  const handleIncrement = async () => {
    if (value < 4 || superType === 'Energy') {
      const newValue = value + 1;
      setValue(newValue);
      try {
        await updateCardQuantity({
          variables: {
            deckId: deckId,
            cardId: cardId,
            quantity: newValue,
          },
        });
        onUpdateQuantity(newValue, cardId); // Call onUpdateQuantity with the new quantity
        updateTotalQuantity(); // Call updateTotalQuantity to update the total quantity in DeckBuilder
      } catch (error) {
        console.log('Failed to update card quantity:', error);
      }
    }
  };

  const handleDecrement = async () => {
    const newValue = value - 1;
    setValue(newValue);
    try {
      if (newValue === 0) {
        await removeCard({
          variables: {
            deckId: deckId,
            cardId: cardId,
          },
        });
      } else {
        await updateCardQuantity({
          variables: {
            deckId: deckId,
            cardId: cardId,
            quantity: newValue,
          },
        });
        onUpdateQuantity(newValue, cardId); // Call onUpdateQuantity with the new quantity
        updateTotalQuantity(); // Call updateTotalQuantity to update the total quantity in DeckBuilder
      }
    } catch (error) {
      console.log('Failed to update card quantity:', error);
    }
  };

  return (
    <div className="col-span-4 my-2 flex flex-col items-center">
      <img src={cardImage} alt={cardName} data={cardId} className='hover:scale-150 rounded' />

      <h1 className="truncate text-center mt-2 text-white bg-[#0B3C49] rounded p-2 text-xs h1-truncate" style={{ maxWidth: '100%' }}>{cardName}</h1>

      <div className="flex items-center mb-4 mt-2">
  {counter && (
    <button
      className="font-bold rounded-md border-2 border-[#0B3C49] hover:bg-[#AFD7CA] text-xs p-2 focus:ring-2 focus:ring-[#FFEC99]"
      onClick={handleDecrement}
      disabled={value === 0}
    >
      -
    </button>
  )}
  <h1 className="text-sm font-bold text-[#AFD7CA] mx-3">{value}</h1>
  
  {counter && (
    <button
      className="font-bold rounded-md border-2 border-[#0B3C49] hover:bg-[#AFD7CA] text-xs p-2 focus:ring-2 focus:ring-[#FFEC99]"
      onClick={handleIncrement}
      disabled={value === 4 && superType !== 'Energy' && quantity === 60}
    >
      +
    </button>
  )}
</div>

    </div>
  );
}

export default DeckElement;
