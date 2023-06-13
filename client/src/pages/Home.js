import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { GET_TOP_POSTS } from "../utils/queries";
import Auth from "../utils/auth";
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowUp } from "react-icons/ai";


import PaletteBox from "../components/PaletteBox";
// import TrendingPalettes from "../components/TrendingPalettes";
import CaughtDecks from "../components/CaughtDecks";
import TopListing from "../components/TopListing";


const Home = () => {
  const [postsArr, setPostsArr] = useState([]);
  const token = Auth.getToken();
  const user_name = token ? Auth.getProfile().data.username : null;
  const navigate = useNavigate();

  const checkStatus = (endpoint) => {
    return token ? `${endpoint}` : "/login";
  };

  const handleClick = () => {
    const endpoint = checkStatus("/marketplace");
    navigate(endpoint);
  };


  const { loading, error, data } = useQuery(GET_TOP_POSTS);

  useEffect(() => {
    if (data) {
      console.log(data)
      const postsLength = data.posts.length;

      const updatePostsArr = () => {
        const newPostsArr = [];
        for (let i = 0; i < postsLength; i++) {
          const colors = data.posts[i];
          const images = data.posts[i];
          const postName = data.posts[i].postName; // Add postName
          const postOwner = data.posts[i].postOwner; // Add postkOwner
          const postId = data.posts[i]._id


          const newPost = [
            {
              title: colors.color1,
              image: images.image1,
              postName: postName, // Pass postName
              postOwner: postOwner, // Pass postOwner
              postId: postId
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
      };

      updatePostsArr();
    }
  }, [data]);

  // scroll to top button
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const [showScrollToTop, setShowScrollToTop] = useState(false); useEffect(() => {
    const handleScroll = () => { if (window.pageYOffset > 100) { setShowScrollToTop(true); } else { setShowScrollToTop(false); } }; window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  },
    []);

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

  // const userId = data.user._id;
  // const name = data.user.name;
  // const bio = data.user.bio;
  // const user = data.user;


  return (
      <Container className="mb-4">

        <Row>
          <Col className="banner-section rounded-xl p-20 bg-[#AFD7CA]">
            <Row className="text-center"></Row>

            <Row className="float-right">
              {/* banner marketplace button */}
              <div className="mr-2">
              <div id="container" className="-ml-4 shadow-lg bg-[#4B957E] p-2 rounded-lg">
                <div className="border-2 border-[#FFEC99] p-2.5 rounded">
                  <button className="learn-more" onClick={handleClick}>
                    <span className="circle" aria-hidden="true">
                      <span className="icon arrow"></span>
                    </span>
                    <span className="button-text">Marketplace</span>
                  </button>
                </div>
              </div>
              </div>
            </Row>
          </Col>
        </Row>

        {/* trending palettes */}


        <Row>
          <Col>
            <div>
              <h2 className="text-[#0B3C49] mb-6 text-center text-5xl font-bold mt-4">Trending Palettes</h2>

              {postsArr.slice(0, 5).map((sectionData, index) => (
                <PaletteBox
                  key={index}
                  sectionData={sectionData}
                  postName={sectionData[0].postName} // Pass postName to PaletteBox
                  postOwner={sectionData[0].postOwner} // Pass postOwner to PaletteBox
                  postId={sectionData[0].postId} // Pass postOwner to PaletteBox
                />
              ))}
            </div>
          </Col>
        </Row>

        {/* bottom row */}
        {/* <div className="mt-8 d-flex flex-wrap"> 
          caught decks
          <Col md={7} className="mb-4">
            <h2 className="text-[#0B3C49] mb-6">Caught Decks</h2>
            <div className="rounded-xl bg-[#4B957E] p-2 m-2">
              <CaughtDecks />
            </div>
          </Col>
          <Col md={5}>
            top listings decks
            <h2 className="text-[#0B3C49] mb-6">Highest Value Listing</h2>
            <div className="rounded-xl bg-[#4B957E] p-4 m-2">
              <TopListing />
            </div>
          </Col>
        </div> */}

        {/* Scroll to top button */}
        {showScrollToTop && (<div className="scroll-to-top animate-bounce" onClick={handleScrollToTop} role="button" tabIndex={0} > <AiOutlineArrowUp /> </div>)}

      </Container>
  );
};

export default Home;