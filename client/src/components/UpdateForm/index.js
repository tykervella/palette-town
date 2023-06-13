import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function UpdateForm() {

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");

    const handleBioChange = (e) => {
        const inputBio = e.target.value;
        if (inputBio.length <= 280) {
          setBio(inputBio);
        } else {
          alert("Bios must be 280 characters or shorter!")
        }
      };

    return(
        <Form className="text-black">
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  id="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  id="bio"
                  rows={4}
                  placeholder="Bio"
                  value={bio}
                  onChange={handleBioChange}
                />
                <p className="text-muted mt-2">{bio.length}/280</p>
              </Form.Group>
            </Form>
    )
}

export default UpdateForm
