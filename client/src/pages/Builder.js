import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_DECK } from '../utils/queries';
import axios from 'axios';

import CardElement from '../components/CardElement';
import SearchCards from '../components/SearchCards';
import BuilderInfo from '../components/BuilderInfo';
import DeckElement from '../components/DeckElement';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function DeckBuilder() {
  const { _id } = useParams();
  const [cards, setCards] = useState([]);
  const [decklist, setDecklist] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [deckName, setDeckName] = useState('');

  const { loading, error, data } = useQuery(GET_DECK, {
    variables: { deckId: _id },
  });

  useEffect(() => {
    if (data && data.deck) {
      const decklistFromData = data.deck.cards.map((card) => ({
        cardId: card.cardId,
        image: card.cardImage,
        cardName: card.cardName,
        quantity: card.quantity,
        superType: card.superType,
      }));
      setDecklist(decklistFromData);

      const total = decklistFromData.reduce((acc, card) => acc + card.quantity, 0);
      setTotalQuantity(total);

      setDeckName(data.deck.deckName);
    }
  }, [data]);

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

  const updateTotalQuantity = (updatedDecklist) => {
    const total = updatedDecklist.reduce((acc, card) => acc + card.quantity, 0);
    setTotalQuantity(total);
  };

  const onUpdateQuantity = (newQuantity, cardId) => {
    const updatedDecklist = decklist.map((card) => {
      if (card.cardId === cardId) {
        return { ...card, quantity: newQuantity };
      }
      return card;
    });
    setDecklist(updatedDecklist);
  
    updateTotalQuantity(updatedDecklist);
  };
  
  return (
    <Container className="mb-4">
      <Row>
        <Col md={7}>
          <div className="bg-[#4B957E] rounded-lg p-4 shadow-lg">
            <div className="border-2 border-[#FFEC99] rounded-lg p-2 shadow-lg">
              <SearchCards onSearch={handleSearch} onRefresh={handleRefresh} />
              <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                {cards.map((card) => (
                  <Col key={card.id}>
                    <CardElement
                      cardId={card.id}
                      cardImage={card.images.small}
                      cardName={card.name}
                      cardType={card.types[0]}
                      superType={card.supertype}
                      deckId={_id}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </Col>
        <Col md={5}>
          <div className="bg-[#4B957E] rounded-lg p-4 shadow-lg">
            <div className="border-2 border-[#FFEC99] rounded-lg p-2 shadow-lg">
              <BuilderInfo deckId={_id} deckName={deckName} quantity={totalQuantity} />
              <Row className="flex-row">
                {decklist.map((card) => (
                  <Col key={card.cardId} xs={12} sm={6} md={4} lg={3}>
                    <DeckElement
                      key={card.cardId}
                      deckId={_id}
                      cardId={card.cardId}
                      cardImage={card.image}
                      cardName={card.cardName}
                      superType={card.superType}
                      quantity={card.quantity}
                      counter={true}
                      onUpdateQuantity={onUpdateQuantity}
                      updateTotalQuantity={updateTotalQuantity} 
                    />
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default DeckBuilder;
