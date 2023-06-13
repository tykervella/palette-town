import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import Auth from '../utils/auth';
import { useParams } from 'react-router-dom';
import { useQuery, useApolloClient } from '@apollo/client';
import { GET_POST, GET_DECK_FOR_POST } from "../utils/queries";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdCatchingPokemon } from 'react-icons/md';

import DeckElement from '../components/DeckElement';


const Post = () => {

  // copy hexcode to clipboard
  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast('Copied to clipboard', { position: 'bottom-right', autoClose: 2000 });
  };

  const token = Auth.getToken();
  const user_name = token ? Auth.getProfile().data.username : null;

  const { _id } = useParams();
  const [decklist, setDecklist] = useState([]);
  const [deckName, setDeckName] = useState();
  const [captureCount, setCaptureCount] = useState(null);
  const [colors, setColors] = useState([]);
  const [postName, setPostName] = useState("");
  const [postOwner, setPostOwner] = useState("");
  const [postText, setPostText] = useState("");
  const [caughtUsers, setCaughtUsers] = useState([]);

  const { loading: postLoading, error: postError, data: postData } = useQuery(GET_POST, { variables: { postId: _id } });

  const client = useApolloClient(); //

  const fetchDeckData = async () => {
    if (deckName) {
      console.log("loaded", deckName)
      try {
        const { data } = await client.query({
          query: GET_DECK_FOR_POST,
          variables: { deckName: deckName },
        });
        console.log(data)
        const cardList = data.deckForPost.cards.map((card) => ({
          cardName: card.cardName,
          cardIMG: card.cardImage,
          cardType: card.cardType,
          quantity: card.quantity,
          cardId: card.cardId
        }));
        setDecklist(cardList);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (postData && postData.post) {
      setCaptureCount(postData.post.captureCount);
      setColors([postData.post.color1, postData.post.color2, postData.post.color3, postData.post.color4, postData.post.color5]);
      setDeckName(postData.post.deckName); // deckName is already being set
      setPostName(postData.post.postName);
      setPostOwner(postData.post.postOwner);
      setPostText(postData.post.postText);
      setCaughtUsers(postData.post.caughtUsers);
    }
  }, [postData]);

  useEffect(() => {
    fetchDeckData();
  }, [deckName]);

  if (postLoading) {
    return (
      <Container>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (postError) {
    console.log(postError);
    return <div>Error loading post</div>;
  }

  return (
    <Container className="">
      <Row>
        <Col xs={12} className='bg-[#AFD7CA] text-center rounded p-2 shadow-lg'>
          <div className='border-3 rounded border-[#0B3C49]'>
            <h1 className='mt-3'>{postName}</h1>
            <p className='mt-4 text-[#0B3C49]'>{postText}</p>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={8}>
          {/* Deck listings */}
          <Row className="flex-row justify-content-center">
            {decklist.map((card) => (
              <Col key={card.cardId} xs={6} md={4} lg={2} className="bg-[#0B3C49] rounded shadow-lg m-2 mb-4 mt-4 p-2">
                <div className='border-2 border-[#FFEC99] p-1 rounded'>
                  <DeckElement
                    deckId={_id}
                    cardId={card.cardId}
                    cardImage={card.cardIMG}
                    cardName={card.cardName}
                    superType={card.superType}
                    quantity={card.quantity}
                    counter={false}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </Col>

        <Col xs={4}>
          <ToastContainer />
          {/* Color Palettes */}
          <Row className="rounded-lg text-center mt-4 pb-4 shadow-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <h1 className='p-2'>Steal a Hexcode!</h1>
            {colors.map((color, index) => (
              <Col key={index} className="">
                <div className="mt-4 p-4 card cursor-pointer border border-black" style={{ backgroundColor: color }} onClick={() => handleCopyToClipboard(color)}>
                  <h3 className="text-center sm:text-gray-500">
                    {color}
                  </h3>
                </div>
              </Col>
            ))}
          </Row>

          <Row className="flex-row justify-content-center rounded bg-[#AFD7CA] p-2 mt-4">
            <div className='border-3 rounded border-[#0B3C49] p-2'>
              <ul className='text-2xl -mb-1 font-bold'>Users who Caught this Post:</ul>
                
                <div className='ml-10 text-gray-500'>
                  {caughtUsers && caughtUsers.length > 0 && caughtUsers.map((user, index) => (
                    <li key={index} className="list-none flex items-center">
                      {user.username}
                    </li>
                  ))}
                </div>

              

            </div>
          </Row>

        </Col>

      </Row>
    </Container>

  );

};

export default Post;

