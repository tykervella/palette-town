import React from 'react';
import Auth from '../../utils/auth';

import { Row, Col } from "react-bootstrap";
import { FaTrashAlt } from 'react-icons/fa'
import { useMutation } from '@apollo/client';

import { REMOVE_FROM_CART } from '../../utils/mutations';



function CartItem({ key, listingId, cardImage, cardName, price, quantity }) {
  const token = Auth.getToken();
  const username = token ? Auth.getProfile().data.username : null;

  const [removeFromCart] = useMutation(REMOVE_FROM_CART);

  const handleRemoveFromCart = async () => {
    try {
      await removeFromCart({
        variables: {
          username: username,
          listingId: listingId
        },
      });
      // Refresh the window location
      window.location.reload();
    } catch (error) {
      console.error("Error removing item from cart", error);
    }
  };



  return (
    <Row key={key} className="mb-3">
      <Col md={3}>
        <div className="relative">
          <img
            src={cardImage}
            alt={cardName}
            style={{ width: "100%" }}
            className="img-fluid rounded-lg shadow-lg hover:shadow-xl"
          />
          {/* <div className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
        {quantity}
      </div> */}
        </div>
      </Col>
      <Col md={6}>
        <div className="flex items-center">
          <div className="flex-grow">
            <div className="text-lg font-bold">{cardName}</div>
            <div className="text-gray-600">${price}</div>
          </div>
        </div>
      </Col>
      <Col md={3} className="flex justify-start">
        <FaTrashAlt
          onClick={handleRemoveFromCart}
          style={{ cursor: "pointer", marginLeft: "-3rem" }}
          className="hover:text-red-500"
        />
      </Col>
    </Row>
  );


}

export default CartItem;
