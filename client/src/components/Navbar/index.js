import React, { useState, useEffect } from "react";
import { useQuery, useApolloClient } from '@apollo/client';
import { Link, useNavigate } from "react-router-dom";
import Auth from "../../utils/auth";
import logo from "../Navbar/assets/pallet-town-logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Modal } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import { GET_CART } from "../../utils/queries";

import CartItem from '../CartItem'

const CustomNavbar = () => {
  const token = Auth.getToken();
  const username = token ? Auth.getProfile().data.username : null;
  const [showCartModal, setShowCartModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const client = useApolloClient();
  const navigate = useNavigate();



  useEffect(() => {
    const total = cartItems.reduce((total, item) => total + item.price, 0);
    setTotalPrice(total.toFixed(2));
  }, [cartItems]);

  // red notification for cart
  useEffect(() => {
    if (username) {
      const fetchCart = async () => {
        try {
          const { data } = await client.query({
            query: GET_CART,
            variables: { username: username }
          });

          if (data && data.user.cart) {
            setCartItems(data.user.cart);
          }
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      };

      fetchCart();
    }
  }, [username, client]);

  const handleCartModalClose = () => setShowCartModal(false);
  const handleCartModalShow = async () => {
    if (username) {
      try {
        const { data } = await client.query({
          query: GET_CART,
          variables: { username: username }
        });

        if (data && data.user.cart) {
          setCartItems(data.user.cart);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    }

    setShowCartModal(true);
  };

  const handleGoToMarketplace = (event) => {
    event.preventDefault()
    setShowCartModal(false);
    navigate('/checkout')
      ;
  };




  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const checkStatus = (endpoint) => {
    return token ? `${endpoint}` : "/login";
  };

  console.log(cartItems)

  const cartQuantity = cartItems.length;

  return (
    <>
      <Navbar
        variant="dark"
        expand="lg"
        className="text-white mb-4 py-3 custom-navbar"
        style={{ backgroundColor: "#AFD7CA" }}
      >
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="text-md me-auto align-items-center">
              <Link className="nav-link text-white me-4" to="/">
                Home
              </Link>

              <NavDropdown title="Create" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to={checkStatus("deck/create")}>
                  Create Deck
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={checkStatus("listing/create")}>
                  Create Listing
                </NavDropdown.Item>
              </NavDropdown>

              <Link to={checkStatus("marketplace")} style={{ textDecoration: "none" }}>
                <span className="nav-link text-white me-4">Marketplace</span>
              </Link>
            </Nav>

            <Navbar.Brand className="text-center flex-grow-1">
              <Link className="text-white d-inline-block" to="/" style={{ textDecoration: "none" }}>
                <img
                  src={logo}
                  alt="Logo"
                  className="h-66 w-auto d-inline-block align-top"
                  style={{ marginBottom: "0px" }}
                />
              </Link>
            </Navbar.Brand>

            <Nav className="align-items-center ms-auto">
              <Nav.Link className="text-white d-flex align-items-center me-4">
                {token && (
                  <>
                    <span className="me-2">Signed in as:</span>
                    <Link className="text-white" to="/profile">
                      {username}
                    </Link>
                  </>
                )}
                {!token && <Link className="text-white" to="/login">Login</Link>}
              </Nav.Link>
              {token && (
                <Nav.Link className="text-white" onClick={logout}>
                  Logout
                </Nav.Link>
              )}
              {token && (
                <Nav.Link className="text-white" onClick={handleCartModalShow}>
                  <FontAwesomeIcon icon={faShoppingCart} />
                  {cartQuantity > 0 && (
                    <span className="bg-red-500 text-white rounded-full px-2 ml-1">
                      {cartQuantity}
                    </span>
                  )}
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showCartModal} onHide={handleCartModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {cartItems.length > 0 && cartItems.map((item, index) =>
            <CartItem
              key={index}
              listingId={item._id}
              cardImage={item.cardImage}
              cardName={item.cardName}
              price={item.price}
            />
          )}

          {cartItems.length === 0 && (
            <div>No Items in your Cart...</div>
          )}

          <div className="d-flex justify-content-between align-items-end mt-4">
            <div></div>
            <div>
              Total: <span className="text-[#4B957E]">${totalPrice}</span>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCartModalClose}>
            Close
          </button>
          <button className="btn btn-secondary" onClick={handleGoToMarketplace}>
            Go to Checkout
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomNavbar;
