import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';


import { GET_CART } from '../utils/queries';
import { REMOVE_LISTING } from '../utils/mutations';

const Success = () => {
  const token = Auth.getToken();
  const username = token ? Auth.getProfile().data.username : null;
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const [removeListing, { loading: removeListingLoading }] = useMutation(REMOVE_LISTING);

  const { loading: getCartLoading } = useQuery(GET_CART, {
    variables: { username },
    onCompleted: (data) => {
      if (data.user.cart) {
        setCartItems(data.user.cart);
      }
    },
    onError: (error) => {
      console.error("Error fetching cart:", error);
    }
  });

  useEffect(() => {
    if (cartItems.length > 0) {
      cartItems.forEach(async (item) => {
        try {
          const { data } = await removeListing({
            variables: { listingId: item._id }
          });
          console.log(`Removed item ${data.removeListing._id}`);
          navigate('/marketplace')
        } catch (err) {
          console.error(`Error removing item ${item._id}:`, err);
        }
      });
    }
  }, [cartItems, removeListing]);

  if (getCartLoading || removeListingLoading) {
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
