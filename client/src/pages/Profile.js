import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../utils/queries";
import Auth from "../utils/auth";

import CircleImage from "./assets/profile-pic.webp";

import ProfileInfo from "../components/ProfileInfo";
import PaletteBox from "../components/PaletteBox";
import DeckPreview from "../components/DeckPreview";
import FeaturedListing from "../components/FeaturedListing";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [postsArr, setPostsArr] = useState([]);
  const [decks, setDecks] = useState([]);
  const [listings, setListings] = useState([]);

  const token = Auth.getToken();
  const user_name = token ? Auth.getProfile().data.username : null;

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { username: user_name },
  });

  useEffect(() => {
    if (data) {
      const user = data.user;
      const postsLength = user.posts.length;

      const updatePostsArr = () => {
        const newPostsArr = [];
        for (let i = 0; i < postsLength; i++) {
          const colors = user.posts[i];
          const images = user.posts[i];
          const postName = user.posts[i].postName;
          const postOwner = user.posts[i].postOwner;
          const postId = user.posts[i]._id;

          const newPost = [
            {
              title: colors.color1,
              image: images.image1,
              postName: postName,
              postOwner: postOwner,
              postId: postId,
            },
            {
              title: colors.color2,
              image: images.image2,
            },
            {
              title: colors.color3,
              image: images.image3,
            },
            {
              title: colors.color4,
              image: images.image4,
            },
            {
              title: colors.color5,
              image: images.image5,
            },
          ];
          newPostsArr.push(newPost);
        }
        setPostsArr(newPostsArr);
        setIsLoading(false);
      };

      updatePostsArr();
      setListings(user.listings);
      setDecks(user.decks)
    }
  }, [data]);

  if (loading || isLoading) {
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

  const userId = data.user._id;
  const name = data.user.name;
  const bio = data.user.bio;
  const user = data.user;

  return (
    <Container className="mb-4">
      <h2 className="mb-4 mt-4 text-[#0B3C49]">Your Profile</h2>
      <div className="p-4 mb-6 bg-[#4B957E] rounded-md">
        <Row className="border-2 border-[#FFEC99] rounded-md p-2">
          <Col md={7} lg={8} className="border-black pr-4">
            <ProfileInfo

              name={name}
              username={user_name}
              bio={bio}
              className="text-white"
            />
          </Col>
          <Col md={5} lg={4} className="text-center">
            <div className="mt-10 d-flex flex-column align-items-center">
              <div className="w-52 h-50 bg-[#0B3C49] rounded-circle mb-3">
                <img
                  src={CircleImage}
                  alt="Profile Circle"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <button className="bg-[#FFEC99] hover:bg-[#AFD7CA] text-xl text-[#0B3C49] py-1 px-3 rounded">
                Update Profile
              </button>
            </div>
          </Col>
        </Row>
      </div>

      <h2 className="mt-14 mb-4 text-[#0B3C49] text-center font-bold">Your Palettes</h2>

      {postsArr.map((sectionData, index) => (
        <PaletteBox
          key={index}
          sectionData={sectionData}
          postName={sectionData[0].postName} // Pass postName to PaletteBox
          postOwner={sectionData[0].postOwner} // Pass postOwner to PaletteBox
          postId={sectionData[0].postId} // Pass postOwner to PaletteBox
        />
      ))}

      <Row>
        <Col md={6}>
          <h2 className="text-[#0B3C49] mb-4 mt-4 text-center font-bold">Your Decks</h2>
          <Container className="bg-[#4B957E] rounded-lg text-black shadow-lg">
            <Row>
              {decks.map((deck, index) => (
                <DeckPreview
                  key={index}
                  deckId={deck._id}
                  deckName={deck.deckName}
                  cardImage={deck.cards[0]?.cardImage || false} // Use optional chaining operator to check for undefined
                />
              ))}
            </Row>

          </Container>


        </Col>
        <Col md={6}>
          <h2 className="text-[#0B3C49] mb-4 mt-4 text-center font-bold">Your Listings</h2>
          <Container className="bg-[#4B957E] rounded-lg text-black shadow-lg">
            {listings.length === 0 ? (
              <p className="text-center text-lg">No current listings..</p>
            ) : (
              <Row>
                {listings.map((listing, index) => (
                  <FeaturedListing
                    key={index}
                    listingId={listing._id}
                    cardName={listing.cardName}
                    cardImage={listing.cardImage}
                    price={listing.price}
                  />
                ))}
              </Row>
            )}
          </Container>
        </Col>
      </Row>

      <div className="mt-4" style={{ paddingBottom: "50px" }}></div>
    </Container>
  );
};

export default Profile;
