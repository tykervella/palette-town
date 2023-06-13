import React from 'react';

const CaughtDecks = () => {
  const cards = [
    {
      title: 'FlwrPwr',
      image: 'https://product-images.tcgplayer.com/274436.jpg',
    },
    {
      title: 'PokeLuver',
      image: 'https://www.codewithmike.com/wp-content/uploads/2022/09/buy-this-charizard.jpg',
    },
    {
      title: 'BugL0v3r',
      image: 'https://assets.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_42.png',
    },
  ];

  return (
    <div className="shadow-lg caught-decks-container bg-[#4B957E] m-4 rounded-xl">
      <div className="border-2 border-[#FFEC99] rounded-md p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <div key={index} className="rounded-xl bg-[#FFEC99]">
              <div className="card-wrapper">
                <img className="mt-4 w-full" src={card.image} alt={card.title} />
                <h3 className="mt-4 mb-4 text-[#4B957E] text-center">{card.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CaughtDecks;


