import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CardElement from '../components/CardElement';
import SearchCards from '../components/SearchCards';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CreateListing() {
  const { _id } = useParams();
  const [cards, setCards] = useState([]);
  const [decklist, setDecklist] = useState([]);


  const getCards = (cardName, cardType, cardSubtype, cardColor, pageNumber) => {
    let queryString = '';

    if (cardName !== '') {
      queryString += `name:${cardName} `;
    }

    if (cardType !== '0') {
      queryString += `supertype:${cardType} `;
    }

    if (cardSubtype !== '0') {
      queryString += `subtypes:${cardSubtype} `;
    }

    if (cardColor !== '0') {
      queryString += `types:${cardColor} `;
    }

    axios
      .get('https://api.pokemontcg.io/v2/cards', {
        params: {
          q: queryString.trim(),
          page: pageNumber,
          pageSize: 12,
        },
      })
      .then((response) => {
        const rawData = response.data;
        const cardsArray = rawData.data.map((card) => ({
          id: card.id,
          name: card.name,
          series: card.set.name,
          series_symbol: card.set.images.symbol,
          images: card.images,
          types: card.types !== undefined ? card.types : ['other'],
          supertype: card.supertype,
        }));
        setCards(cardsArray);
      })
      .catch((error) => {
        console.error(error);
        setCards([]);
      });
  };

  const handleSearch = (cardName, cardType, cardSubtype, cardColor) => {
    getCards(cardName, cardType, cardSubtype, cardColor, 1);
  };

  const handleRefresh = () => {
    const storedCardName = sessionStorage.getItem('cardName');
    const storedCardType = sessionStorage.getItem('cardType');
    const storedCardSubtype = sessionStorage.getItem('cardSubtype');
    const storedCardColor = sessionStorage.getItem('cardColor');

    getCards(
      storedCardName || '',
      storedCardType || '0',
      storedCardSubtype || '0',
      storedCardColor || '0',
      1
    );
  };

  useEffect(() => {
    handleRefresh();
  }, []);



  return (
    <Container className="my-4 d-flex justify-content-center">
      <div className="bg-[#4B957E] rounded-lg p-4 shadow-lg">
        <div className="border-2 border-[#FFEC99] rounded-lg p-3 shadow-lg">
          <SearchCards onSearch={handleSearch} onRefresh={handleRefresh} />
          <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {cards.map((card) => (
              <Col key={card.id}>
                <CardElement
                  cardId={card.id}
                  cardImage={card.images.small}
                  cardName={card.name}
                  cardType={card.types[0]}
                  superType={card.supertype}
                  deckId={_id}
                  createListing={true}
                />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </Container>
  );   
}

export default CreateListing;
