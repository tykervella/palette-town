import React, { useState, useEffect } from "react";
import { useApolloClient } from '@apollo/client';
import Auth from "../utils/auth";
import { Container, Row, Col } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import { useMutation } from '@apollo/client';



import { GET_CART } from '../utils/queries';
import { REMOVE_FROM_CART} from '../utils/mutations';
import CartItem from '../components/CartItem';


const Checkout = () => {
  const token = Auth.getToken();
  const username = token ? Auth.getProfile().data.username : null;
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const client = useApolloClient();
  const stripePromise = loadStripe("pk_test_51NIKBUE8H0olH7rAq4x67BpaEWrBjgaHUU1VrfPUQt0ANI6FXL21E8vvwLzeAIDdZQrAfZFv2AQ8Qx3U2UWdgLor00bYZryjyK");

  
  const [removeFromCart] = useMutation(REMOVE_FROM_CART);

  const handleRemoveFromCart = async (listingId) => {
    try {
      await removeFromCart({
        variables: {
          username: username,
          listingId: listingId
        },
      });
    } catch (error) {
      console.error("Error removing item from cart", error);
    }
  };

  const removeAllItemsFromCart = async () => {
    for (const item of cartItems) {
      try {
        await handleRemoveFromCart(item._id);
      } catch (error) {
        console.error('Error removing listing:', error);
      }
    }
    // Refresh the window location to reflect the changes in cart
  };

  useEffect(() => {
    const total = cartItems.reduce((total, item) => total + item.price, 0);
    setTotalPrice(total.toFixed(2));
  }, [cartItems]);

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

  const handleCheckout = async () => {

    // Load Stripe.js
    const stripe = await stripePromise;
  
    // Call your backend server to create a Checkout Session
    const response = await fetch("https://palette-town.herokuapp.com/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cart: cartItems
      })
    });
  
    const session = await response.json();
  
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  
    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      console.error(result.error.message);
    }
  };
  
  


  return (
    <Container className="mt-5 text-center rounded shadow-lg mb-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
      <h1 className="mb-10 p-4">Checkout</h1>

      {cartItems.length > 0 ? (
        <Row className="cart-items-container">
          {cartItems.map((item, index) => (
            <Col key={index} xs={12} md={6} lg={6} xl={6}>
              <CartItem
                listingId={item._id}
                cardImage={item.cardImage}
                cardName={item.cardName}
                price={item.price}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center mb-4">No Items in your Cart...</div>
      )}

      <div className="d-flex justify-content-end p-4">
        <h5 className="mr-3">Total: <span className="text-[#4B957E]">${totalPrice}</span></h5>
      </div>

      <button onClick={handleCheckout} className="checkout-button text-2xl text-white bg-[#0B3C49] p-2 rounded hover:bg-[#4B957E] mb-4">Checkout</button>

    </Container>
  );
}

export default Checkout;