import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import Auth from '../utils/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_POST } from '../utils/mutations';
import { GET_DECK } from "../utils/queries";

import DeckElement from '../components/DeckElement';



const CreatePost = () => {
  //get username from logged in token, intitalizes 
  const token = Auth.getToken();
  const user_name = token ? Auth.getProfile().data.username : null;
  const navigate = useNavigate();


  // initializing of various states we will use throughout code. 
  const { _id } = useParams();
  const [sortedCardTypes, setSortedCardTypes] = useState([]);
  const [sortedImages, setSortedImages] = useState([]);
  const [decklist, setDecklist] = useState([]);  // Define decklist state variable
  const [name, setName] = useState("");
  const [deckName, setDeckName] = useState("");
  const [text, setText] = useState("");



  // function that takes in rgb values in and returns a 6 character hexcode
  function rgbToHex(r, g, b) {
    const red = r.toString(16).padStart(2, '0');
    const green = g.toString(16).padStart(2, '0');
    const blue = b.toString(16).padStart(2, '0');
    return `#${red}${green}${blue}`;
  }


  //takes in a colorName and returns associated rgb values
  function deconstructColor(colorName) {
    // base colors for each pokemon cardType to start at and then randomize.
    const colors = [
      { name: "Colorless", rgb: "229, 242, 200" },
      { name: "Darkness", rgb: "37, 31, 41" },
      { name: "Dragon", rgb: "147, 129, 255" },
      { name: "Fairy", rgb: "255, 200, 221" },
      { name: "Fighting", rgb: "247, 127, 0" },
      { name: "Fire", rgb: "230, 57, 70" },
      { name: "Grass", rgb: "128, 237, 153" },
      { name: "Lightning", rgb: "252, 246, 139" },
      { name: "Metal", rgb: "43, 45, 66" },
      { name: "Psychic", rgb: "205, 180, 219" },
      { name: "Water", rgb: "162, 210, 255" }
    ];
    //finds color equal to what is passed as a parameter
    const color = colors.find(obj => obj.name === colorName);

    // deconstructs passed parameter and splits it into rgb values 
    if (color) {
      const [r, g, b] = color.rgb.split(", ").map(Number);
      return { r, g, b };
    }

    return null; // Color not found
  }


  // takes in rgb values and changes them by up to 50 in either direction to randomly generate a color. 
  function generateColor(r, g, b) {
    // Generate random values between -50 and 50
    const randomR = (Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 101) - 50);
    const randomG = (Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 101) - 50);
    const randomB = (Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 101) - 50);

    // new value is old value plus randomly generated number 
    const newR = r + randomR
    const newG = g + randomG
    const newB = b + randomB

    // Ensure the values are within the valid range (0-255)
    const clampedR = Math.min(Math.max(newR, 0), 255);
    const clampedG = Math.min(Math.max(newG, 0), 255);
    const clampedB = Math.min(Math.max(newB, 0), 255);

    //returns new rgb value (that can be passed and used in rgbtoHex function)
    return rgbToHex(clampedR, clampedG, clampedB);
  }

  const handleTextChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length <= 280) {
      setText(inputText);
    } else {
      alert("Post text must be 280 characters or shorter!")
    }
  };

  // getting deck information for the deck with the _id equal to the params
  const { loading: deckLoading, error: deckError, data: deckData } = useQuery(GET_DECK, { variables: { deckId: _id } });


  useEffect(() => {
    if (deckData && deckData.deck) {
      // console.log(deckData.deck);
  
      const cardList = deckData.deck.cards.map((card) => ({
        cardName: card.cardName,
        cardIMG: card.cardImage,
        cardType: card.cardType,
        quantity: card.quantity,
        cardId: card.cardId
      }));

      setDecklist(cardList)
      setDeckName(deckData.deck.deckName)
      console.log(cardList)



      const cardTypeArray = deckData.deck.cards.map((card) => card.cardType);
      const uniqueCardTypes = [...new Set(cardTypeArray)].filter(
        (type) => type !== "other"
      );
      const sortedCardTypes = uniqueCardTypes.sort((a, b) => {
        const countA = cardTypeArray.filter((type) => type === a).length;
        const countB = cardTypeArray.filter((type) => type === b).length;
        return countB - countA;
      });
      setSortedCardTypes(sortedCardTypes);


      // Check the length of modifiedCardTypes
      const length = sortedCardTypes.length;
      if (length === 1) {
        const repeatedValue = sortedCardTypes[0];
        // Copy the objects until the length is 5
        for (let i = length; i < 5; i++) {
          sortedCardTypes.push(repeatedValue);
        }
      } else if (length === 2) {
        const value0 = sortedCardTypes[0];
        const value1 = sortedCardTypes[1];

        sortedCardTypes.push(value0)
        sortedCardTypes.push(value1)
        sortedCardTypes.push(value0)
      } else if (length === 3) {
        const value0 = sortedCardTypes[0];
        const value1 = sortedCardTypes[1];

        sortedCardTypes.push(value1)
        sortedCardTypes.push(value0)
      } else if (length === 4) {
        const value0 = sortedCardTypes[0];
        sortedCardTypes.push(value0)
      }

      const generateSortedImages = () => {
        const images = [];
        const tempCardList = JSON.parse(JSON.stringify(cardList));  // Deep copy of cardList
        sortedCardTypes.forEach((cardType) => {
          if (cardType !== "other") { // Exclude "other" type
            const card = tempCardList.find(
              (card) => card.cardType === cardType
            );
      
            if (card) {
              const cardImage = card.cardIMG
              images.push(cardImage);
      
              const index = tempCardList.findIndex((card) => card.cardIMG === cardImage);
      
              // Remove the element at the found index from tempCardList
              if (index !== -1) {
                tempCardList.splice(index, 1);
              }
      
            }
          }
        });
      
        setSortedImages(images);
      };

      generateSortedImages();

    }
  }, [deckData, _id]);

  const [addPost, { loading: postLoading, error: postError, data: postData }] = useMutation(ADD_POST);


  const handleAddPost = async (event) => {
    try {
      event.preventDefault();
      console.log(deckName)

      const modifiedCardTypes = {};

      for (let i = 0; i < 5; i++) {
        if (i < sortedCardTypes.length) {
          const cardType = sortedCardTypes[i];
          const { r, g, b } = deconstructColor(cardType);
          const newColor = generateColor(r, g, b);
          modifiedCardTypes[`color${i + 1}`] = newColor;
        } else {
          modifiedCardTypes[`color${i + 1}`] = '';
        }

      }

      const image1 = sortedImages[0];
      const image2 = sortedImages[1];
      const image3 = sortedImages[2];
      const image4 = sortedImages[3];
      const image5 = sortedImages[4];
      console.log(image1, image2, image3, image4, image5)

      const response = await addPost({
        variables: {
          postOwner: user_name,
          postName: name, 
          deckName: deckName,
          color1: modifiedCardTypes.color1,
          color2: modifiedCardTypes.color2,
          color3: modifiedCardTypes.color3,
          color4: modifiedCardTypes.color4,
          color5: modifiedCardTypes.color5,
          image1: image1,
          image2: image2,
          image3: image3,
          image4: image4,
          image5: image5,
          postText: text
        }
      });

      const newPost = response.data.addPost._id
      console.log(newPost)
      navigate("/profile")
      // const color1 = response.data.addPost.color1
      // console.log(newPost, modifiedCardTypes, color1)
    } catch (error) {
      console.log(error);
    }
  };

  if (deckLoading) {
    return (
      <Container>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (deckError) {
    console.log(deckError);
    return <div>Error loading deck</div>;
  }
  console.log(decklist)

  return (
<Container className="d-flex flex-column justify-content-center align-items-center rounded-lg bg-[#AFD7CA] p-4 mb-4">
  <div className="border-2 border-[#FFEC99] rounded-lg p-4 d-flex flex-column align-items-center">
    <Form className="text-center">

      {/* post title input */}
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          id="name"
          placeholder="Post Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-center w-50 mx-auto"
          style={{ maxWidth: '400px' }}
        />
      </Form.Group>

      {/* deck listing */}
      <Row className="justify-content-center">
        {decklist.map((card) => (
          <Col key={card.cardId} xs={6} md={4} lg={2} className="">
            <DeckElement
              deckId={_id}
              cardId={card.cardId}
              cardImage={card.cardIMG}
              cardName={card.cardName}
              superType={card.superType}
              quantity={card.quantity}
              counter={false}
            />
          </Col>
        ))}
      </Row>

      {/* bio input  */}
      <Form.Group className="mb-3">
        <Form.Control
          as="textarea"
          id="bio"
          rows={4}
          placeholder="Post Description..."
          value={text}
          onChange={handleTextChange}
          className="w-50 mx-auto text-center"
          style={{ maxWidth: '400px' }}
        />
        <p className="text-muted mt-2 float-right">{text.length}/280</p>
      </Form.Group>

      {/* publish button */}
      <div className="text-center">
        <button className="bg-[#FFEC99] hover:bg-[#4B957E] text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleAddPost}>
          Publish
        </button>
      </div>

    </Form>
  </div>
</Container>

  );
  
};

export default CreatePost;

