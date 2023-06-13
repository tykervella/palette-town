import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { BsBrush } from "react-icons/bs";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";



const Signup = () => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    name: "",  
    bio: "",
  });
  const [showPassword, setShowPassword] = useState(false); // New state variable

  const [addUser, { error, data }] = useMutation(ADD_USER);
  
  const handleChange = (event) => {
    const { name, value } = event.target;

    // Limit the bio to 280 characters
    if (name === "bio" && value.length > 280) {
      alert("Bios must be 280 characters or shorter!");
      return;
    }

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      // Auth.login(data.addUser.token);
      navigate("/login")
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container className="mb-5">
      <Row className="justify-content-center align-items-center">
        {/* left column */}
        <Col md={7} className="d-none d-md-block">
          <div className=" text-[#0B3C49] loginLogo rounded-3xl shadow-xl">
            <div className="d-flex flex-column align-items-center justify-center text-center pt-60">
              <h1 className="mb-2 mt-4">Sign up to Enter Palette Town</h1>
              <h2 className="text-center italic">
                Where hexcodes and palettes collide{" "}
                <span className="d-inline-flex align-items-center">
                  <BsBrush size={42} style={{ color: "#0B3C49" }} />
                </span>
              </h2>
            </div>
          </div>
        </Col>

        {/* right column */}
        <Col md={5} className="bg-[#0B3C49] rounded-3xl shadow-xl">
          <h1 className="text-white pt-10 text-center mt-4">Palette Town</h1>
          <h2 className="text-xl text-white pt-2 text-center italic">
            Where Hexcodes Choose YOU!
          </h2>
          {data ? (
            <p>
              Success! You may now head{" "}
              <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
            <div className="d-flex justify-content-center align-items-center justify-content-center">
              <form onSubmit={handleFormSubmit}>
                <div className="mb-3 pt-20">
                  <p className="text-white  text-xs">New Username</p>
                  <input
                    className="form-input bg-transparent border-b-2 border-[#376D5B] w-full text-white focus:outline-none resize-none"
                    placeholder="Your username"
                    name="username"
                    type="text"
                    value={formState.username}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                <p className="text-white  text-xs">Full Name</p>
                <input
                  className="form-input bg-transparent border-b-2 border-[#376D5B] w-full text-white focus:outline-none resize-none"
                  placeholder="Your full name"
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
              </div>

                <div className="mb-3">
                  <p className="text-white text-xs">User Email</p>
                  <input
                    className="form-input bg-transparent border-b-2 border-[#376D5B] w-full text-white focus:outline-none resize-none"
                    placeholder="example@example.com"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <p className="text-white text-xs">Password</p>
                  <input
                    className="form-input bg-transparent border-b-2 border-[#376D5B] w-80 text-white focus:outline-none resize-none"
                    placeholder="******"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formState.password}
                    onChange={handleChange}
                  />
                  <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={toggleShowPassword}
                    className="hidden"
                  />
                  <label
                    htmlFor="showPassword"
                    className="ml-2 icon-label text-xl text-white "
                    style={{ cursor: "pointer" }}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </label>
                </div>

                <div className="mb-2">
                <p className="text-white text-xs">Bio</p>
                <textarea
                  className="form-input bg-transparent border-b-2 border-[#376D5B] w-full text-white focus:outline-none resize-none"
                  placeholder="Tell us something about yourself"
                  name="bio"
                  value={formState.bio}
                  onChange={handleChange}
                />
                <p className="text-white mt-2">{formState.bio.length}/280</p>
                </div>

                <div className="flex justify-center">
                  <button
                    className=" text-black mt-2 mb-4 btn-block bg-[#FFEC99] hover:bg-[#4B957E] font-bold py-3 px-6 rounded-lg text-lg"
                    style={{ cursor: "pointer" }}
                    type="submit"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          )}

          {error && (
            <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
