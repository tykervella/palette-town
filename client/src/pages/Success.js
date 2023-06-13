import React, { useState, useEffect } from "react";
import { useApolloClient } from '@apollo/client';
import Auth from "../utils/auth";
import { Container, Row, Col } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import { useMutation } from '@apollo/client';


import { GET_CART } from '../utils/queries';
import { REMOVE_LISTING} from '../utils/mutations';


const Success= () => {
  const token = Auth.getToken();
  const username = token ? Auth.getProfile().data.username : null;
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const client = useApolloClient();
  const stripePromise = loadStripe("pk_test_51NIKBUE8H0olH7rAq4x67BpaEWrBjgaHUU1VrfPUQt0ANI6FXL21E8vvwLzeAIDdZQrAfZFv2AQ8Qx3U2UWdgLor00bYZryjyK");

  
  const [removeListing] = useMutation(REMOVE_LISTING);




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

  useEffect(() => {
    // make sure cartItems is not empty
    if (cartItems.length > 0) {
        cartItems.forEach(async (item) => {
            try {
                const { data } = await removeListing({
                    variables: { listingId: item._id }
                });
                console.log(`Removed item ${data.removeListing._id}`);
            } catch (err) {
                console.error(`Error removing item ${item._id}:`, err);
            }
        });
    }
    }, [cartItems, removeListing]);

    if (loading ) {
        return (
          <Container>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Please wait as we redirect you...</span>
            </Spinner>
          </Container>
        );
      }

  
  return (
    <Container className="mt-5 text-center rounded shadow-lg mb-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>

    </Container>
  );
}

export default Success;