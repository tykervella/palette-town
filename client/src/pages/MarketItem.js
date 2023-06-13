import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { GET_LISTINGS } from '../utils/queries';
import { ADD_TO_CART } from '../utils/mutations';
import { Container, Row, Modal } from 'react-bootstrap';
import Auth from "../utils/auth";

const MarketItem = () => {
  const { id } = useParams();
  const token = Auth.getToken();
  const username = token ? Auth.getProfile().data.username : null;
  const [listing, setListing] = useState(null);
  const [prices, setPrices] = useState([]);
  const [addToCart, { data: mutationData }] = useMutation(ADD_TO_CART);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_LISTINGS);

  useEffect(() => {
    if (data && data.allListings) {
      const foundListing = data.allListings.find((item) => item._id === id);
      setListing(foundListing);
    }
  }, [data, id]);

  useEffect(async () => {
    if (listing) {
      const response = await fetch(`https://api.pokemontcg.io/v2/cards/${listing.cardId}`);
      const data = await response.json();
      const pricesArr = data.data.tcgplayer.prices;
      setPrices(pricesArr);
    }
  }, [listing]);

  const handleAddToCart = async () => {
    await addToCart({ variables: { username: username, listingId: id } });
    setShowAddToCartModal(true);
  };

  useEffect(() => {
    if (mutationData) {
      console.log('Item added to cart', mutationData.addToCart);
    }
  }, [mutationData]);

  const handleAddToCartModalClose = () => {
    setShowAddToCartModal(false);
  };

  const handleReturnToMarketplace = () => {
    setShowAddToCartModal(false);
    navigate('/marketplace')
    window.location.reload();
    ;
  };

  const handleCheckout = () => {
    setShowAddToCartModal(false);
    navigate('/checkout')
    window.location.reload();
    ;
  };

  if (loading || !prices) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching listing data</div>;
  }

  if (!listing) {
    return <div>Listing not found</div>;
  }

  return (
    <>
      <Container className="d-flex justify-content-center mb-4">
        <Row className="rounded-xl bg-[#0B3C49] shadow-lg p-2">
          <div className="d-flex border-2 border-[#FFEC99] rounded p-4">
            <div>
              <h2 className="text-center text-truncate text-decoration-none bg-[#FFEC99] rounded-lg">
                {listing.cardName}
              </h2>
              <img src={listing.cardImage} alt={listing.cardName} className="hover:scale-150" />
              <h2 className="text-center text-truncate text-decoration-none bg-[#FFEC99] rounded-lg mt-2">
                Price: <span className='text-[#376D5B]'>${listing.price}</span>
              </h2>
            </div>
            <div className="ml-10 mt-20 text-white">
              <p className="text-2xl">
                Seller: <span className="text-[#AFD7CA]">{listing.seller}</span>
              </p>
              <p className="text-2xl">
                Card Color: <span className="text-[#AFD7CA]">{listing.cardType}</span>
              </p>
              <p className="text-2xl">
                Card Type: <span className="text-[#AFD7CA]">{listing.superType}</span>
              </p>

              {/* <p>
                Low Selling Price: <span className="text-[#AFD7CA]">${prices[0].low}</span>
              </p>
              <p>
                Average Selling Price: <span className="text-[#AFD7CA]">${prices[0].mid}</span>
              </p>
              <p>
                High Selling Price: <span className="text-[#AFD7CA]">${prices[0].high}</span>
              </p> */}

              <div className="text-center">
                <button className="bg-[#AFD7CA] hover:bg-[#FFEC99] text-black p-2 m-2 rounded" onClick={handleAddToCart}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </Row>
      </Container>

      <Modal show={showAddToCartModal} onHide={handleAddToCartModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Added to your cart!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Item has been added to your cart.</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleReturnToMarketplace}>
            Return to Marketplace
          </button>
          <button className="btn btn-primary" onClick={handleCheckout}>
            Checkout
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MarketItem;
