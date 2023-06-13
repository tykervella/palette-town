import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Spinner, Modal  } from 'react-bootstrap';
import Auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { waterStarterDeck, grassStarterDeck, fireStarterDeck, dragonStarterDeck} from '../utils/starterDecks';
import { CREATE_DECK, ADD_TO_DECK } from '../utils/mutations';
import NavDropdown from 'react-bootstrap/NavDropdown';


const CreateDeck = () => {
 
  const noStarterDeck = []

  const token = Auth.getToken();
  const user_name = token ? Auth.getProfile().data.username : null;
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState('Starter Decks');


  const handleNameChange = (e) => {
    const inputName = e.target.value;
    if (inputName.length <= 30) {
      setName(inputName);
    } else {
      alert('Deck Names must be 30 characters or shorter!');
    }
  };

  const [createDeck, { loading, error, data }] = useMutation(CREATE_DECK);
  const [addCardToDeck, { loading: addingCardsLoading, error: addingCardsError }] = useMutation(ADD_TO_DECK);

  const handleCreateDeck = async (event) => {
    event.preventDefault();
    if (!name) {
      setShowModal(true);
      return;
    } else { 
      try {
        const response = await createDeck({ variables: { deckOwner: user_name, deckName: name } });
        const newDeck = response.data.addDeck._id;
  
        let chosenStarterDeck;
        switch(selectedDeck) {
          case 'Fire':
            chosenStarterDeck = fireStarterDeck;
            break;
          case 'Water':
            chosenStarterDeck = waterStarterDeck;
            break;
          case 'Grass':
            chosenStarterDeck = grassStarterDeck;
            break;
          case 'Dragon':
            chosenStarterDeck = dragonStarterDeck;
            break;
          default:
            chosenStarterDeck = noStarterDeck;  // the default deck you provided
        }
        await addStarterDeckToNewDeck(newDeck, chosenStarterDeck);
        navigate(`/deck/${newDeck}`);
        // Perform any additional actions after creating the deck
      } catch (error) {
        console.log(error);
      }
    }  
  };
  
  const addStarterDeckToNewDeck = async (newDeckId, starterDeck) => {
    try {
      for (let card of starterDeck) {
        await addCardToDeck({ variables: { 
          deckId: newDeckId, 
          cardId: card.cardId, 
          cardName: card.cardName, 
          cardImage: card.cardImage, 
          cardType: card.cardType, 
          superType: card.superType 
        }});
      }
    } catch (err) {
      console.error(err);
    }
  };
  

  const handleCloseModal = () => setShowModal(false);

  if (loading) {
    return (
      <Container>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    console.log(error);
    return <div>Error loading profile</div>;
  }

  return (
    <Container className="flex justify-center m-10">
      <Row>
        <Col className="max-w-3xl w-full p-4 bg-[#4B957E] text-white rounded-lg shadow-lg">
          <div className='border-2 border-[#FFEC99] p-2 rounded-lg'>
            <h2 className="text-4xl font-bold m-6 underline">Create your Pokemon Deck</h2>
            <div className="text-center">
              <Form className="text-black mx-auto">
                <div className="w-80 mx-auto">
                  <Form.Group className="box-shadow-xl p-2 rounded-lg">
                    <Form.Control
                      type="text"
                      id="name"
                      placeholder="Deck Name"
                      value={name}
                      onChange={handleNameChange}
                      className="bg-transparent border-b-2 border-[#376D5B] p-2 text-white leading-tight focus:outline-none"
                    />
                    <p className="mt-2 text-white">{name.length}/30</p>
                  </Form.Group>
                </div>

                {/* bottom portion of create page */}
                <div className='flex flex-row align-items-center justify-center pb-4'>
                  <button onClick={handleCreateDeck} className="bg-[#FFEC99] hover:bg-[#AFD7CA] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Create Deck
                  </button>
                  <span className='ml-2 mr-2'>OR</span>

                  <NavDropdown title={selectedDeck} id="basic-nav-dropdown" className="bg-[#FFEC99] hover:bg-[#AFD7CA] text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    <NavDropdown.Item onClick={() => setSelectedDeck('None')}>None</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => setSelectedDeck('Fire')}>Fire</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => setSelectedDeck('Water')}>Water</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => setSelectedDeck('Grass')}>Grass</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => setSelectedDeck('Dragon')}>Dragon</NavDropdown.Item>


                  </NavDropdown>
                </div>

              </Form>
            </div>
          </div>
        </Col>
      </Row>

      <Modal show={showModal}>
        <Modal.Header closeButton>
          <Modal.Title>You must name your deck!</Modal.Title>
        </Modal.Header>
     
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseModal}>
            Ok
          </button>
        </Modal.Footer>
      </Modal>
      
    </Container>

    
  );
};

export default CreateDeck;
