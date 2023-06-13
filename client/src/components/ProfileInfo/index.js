import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

function ProfileInfo({ key, name, username, bio }) {
  const [bioValue, setBioValue] = useState(bio || ""); 
  const MAX_CHARACTERS = 250;

  const handleBioChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARACTERS) {
      setBioValue(value);
    }
  };

  return (
    <Container key={key} className="shadow-lg text-white bg-[#4B957E]">
      <Row className="mb-3 mt-4" key={name}>
        <Col md={10}>
          <h5>Name:</h5>
          <input
            className="p-1 text-black bg-white w-full"
            type="text"
            value={name}
            readOnly
          />
        </Col>
      </Row>
      <Row className="text-white mb-3" key={username}>
        <Col md={10}>
          <h5>Username:</h5>
          <input
            className="p-1 text-black bg-white w-full"
            type="text"
            value={username}
            readOnly
          />
        </Col>
      </Row>
      <Row className="mb-3" key={bio}>
        <Col md={10}>
          <h5>Bio:</h5>
          <input
            className="p-4 mb-0 text-black bg-white w-full"
            type="text"
            value={bioValue}
            onChange={handleBioChange}
          />
          <p className="text-xs text-white mt-2">
            {bioValue.length}/{MAX_CHARACTERS}
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileInfo;









