import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Auth from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import likeButton from '../TrendingPalettes/assets/pokeball-like.png';

import { ADD_TO_CAUGHT_POSTS, ADD_TO_CAUGHT_USERS } from '../../utils/mutations';

function PaletteBox({ sectionData, postName, postOwner, postId }) {
  const token = Auth.getToken();
  const username = token ? Auth.getProfile().data.username : null;
  const userId = token ? Auth.getProfile().data._id : null;

  const navigate = useNavigate();
  const [addToCaughtPosts] = useMutation(ADD_TO_CAUGHT_POSTS);
  const [addToCaughtUsers] = useMutation(ADD_TO_CAUGHT_USERS);

  const handleClick = () => {
    navigate(`/post/${postId}`);
  };

  const handleLike = async () => {
    if (username) {
      // Call the mutations when the like button is clicked
      await addToCaughtPosts({ variables: { username: username, postId } });
      await addToCaughtUsers({ variables: { postId, userId } });
      navigate(`/post/${postId}`);
    } else {
      navigate(`/login`);
    }
  
  };

  return (
    <Container>
      <div className="rounded-lg p-2 mt-4 shadow-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
        <div className="flex flex-wrap mb-4 mt-4">
          {sectionData.map((item, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={2}>
              <div className="p-4 transition-transform duration-300 transform-gpu hover:scale-150 mt-4" style={{ backgroundColor: item.title }}>
                <img src={item.image} alt={item.title} className="w-full mb-2" />
                <h3 className="mb-0 text-[#4B957E] text-center">{item.title}</h3>
              </div>
            </Col>
          ))}
          <Col xs={12} sm={6} md={4} lg={2}>
            <div className="shadow-lg mt-14 ml-4 bg-[#4B957E] rounded-lg p-3 h-60 flex flex-col justify-between">
              <div className="shadow-lg mt-4 border-2 border-[#FFEC99] rounded-lg p-4 flex flex-col">
                <h4 className="mb-2 text-sm font-semibold text-center text-white sm:text-black truncate">
                  {postName}
                </h4>
                <p className="mb-4 text-sm text-center text-white sm:text-black truncate">
                  @{postOwner}
                </p>
                <div className="flex justify-between items-center">
                  <button className="mb-2 bg-[#FFEC99] hover:bg-[#AFD7CA] text-sm text-black py-1 px-2 rounded overflow-ellipsis whitespace-nowrap" onClick={handleClick}>
                    View Post
                  </button>
                  <a href="#" className="text-red-500 text-1xl ml-1" onClick={handleLike}>
                    <img
                      src={likeButton}
                      alt="Like"
                      className="ml-2 mb-1 w-14 h-6 object-contain"
                    />
                  </a>
                </div>
              </div>
            </div>
          </Col>
        </div>
      </div>
    </Container>
  );
}

export default PaletteBox;






