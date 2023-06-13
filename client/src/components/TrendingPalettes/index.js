import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { SliderData } from './SliderData';
import likeButton from '../TrendingPalettes/assets/pokeball-like.png';

const TrendingPalettes = () => {
  const firstSectionData = SliderData.slice(0, 5);
  const secondSectionData = SliderData.slice(0, 5);

  return (
    <Container>
      <h2 className="text-black mb-4 mt-4">Trending Palettes</h2>

      <div className="border border-black rounded-lg p-4 bg-[#376D5B] mb-4">
        <Row className="flex-wrap">
          {firstSectionData.map((item, index) => (
            <Col key={index} xs={6} sm={4} md={2} className="mb-4">
              <div className="border border-black p-4 bg-[#AFD7CA] rounded-lg">
                <img src={item.image} alt={item.title} />
                <h3 className="mt-4 mb-0 text-white sm:text-black">
                  {item.title}
                </h3>
              </div>
            </Col>
          ))}
          <Col
            xs={6}
            sm={4}
            md={2}
            className="mb-4  border border-black p-4 bg-[#AFD7CA] rounded-lg"
          >
            <h4 className="mt-2 text-lg font-semibold text-center text-white sm:text-black">
              Deck Name
            </h4>
            <p className="text-sm text-center text-white sm:text-black">
              @username
            </p>
            <div className="flex items-center justify-center flex-col sm:flex-row">
              <Button className="bg-blue-500 text-xs text-white py-1 px-2 mt-4 sm:mt-0 sm:ml-4 rounded">
                View Deck
              </Button>
              <a
                href="#"
                className="text-red-500 text-2xl ml-0 mt-4 sm:mt-0 sm:ml-4"
              >
                <img
                  src={likeButton}
                  alt="Like"
                  style={{ width: "30px", height: "auto" }}
                />
              </a>
            </div>
          </Col>
        </Row>
      </div>

      <div className="border border-black rounded-lg p-4 bg-[#376D5B]">
        <Row className="flex-wrap">
          {secondSectionData.map((item, index) => (
            <Col key={index} xs={6} sm={4} md={2} className="mb-4">
              <div className="border border-black p-4 bg-[#AFD7CA] rounded-lg">
                <img src={item.image} alt={item.title} />
                <h3 className="mt-4 mb-0 text-white sm:text-black">
                  {item.title}
                </h3>
              </div>
            </Col>
          ))}
           <Col
            xs={6}
            sm={4}
            md={2}
            className="mb-4 bg-[#AFD7CA] border border-black p-4 rounded-lg"
          >
             <h4 className="mt-2 text-lg font-semibold text-center text-white sm:text-black">
              Deck Name
            </h4>
            <p className="text-sm text-center text-white sm:text-black">
              @username
            </p>
            <div className="flex items-center justify-center flex-col sm:flex-row">
              <Button className="bg-blue-500 text-xs text-white py-1 px-2 mt-4 sm:mt-0 sm:ml-4 rounded">
                View Deck
              </Button>
              <a
                href="#"
                className="text-red-500 text-2xl ml-0 mt-4 sm:mt-0 sm:ml-4"
              >
                <img
                  src={likeButton}
                  alt="Like"
                  style={{ width: "30px", height: "auto" }}
                />
              </a>
            </div>
          </Col>
        </Row>
      </div>

      <div className="mt-4" style={{ paddingBottom: "50px" }}></div>
    </Container>
  );
};

export default TrendingPalettes;