import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart } from '@fortawesome/free-solid-svg-icons';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Footer from './components/Footer';
import DeckBuilder from './pages/Builder';
import Navbar from './components/Navbar';
import Marketplace from './pages/Marketplace';
import Profile from './pages/Profile'
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import CreateDeck from './pages/CreateDeck'
import CreateListing from './pages/CreateListing'
import CreatePost from './pages/CreatePost'
import Post from './pages/Post'
import MarketItem from './pages/MarketItem';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});



// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});




function App() {
  return (
    <ApolloProvider client={client}>
      <div className="font-link flex-column justify-flex-start min-100-vh bg-white wallpaper">
        <Navbar />

        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/deck/create" element={<CreateDeck />} />
            <Route path="/deck/:_id" element={<DeckBuilder />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/post/publish/:_id" element={<CreatePost />} />
            <Route path="/post/:_id" element={<Post />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/listing/create" element={<CreateListing />} />
            <Route path="/listing/:id" element={<MarketItem />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Checkout" element={<Checkout />} />
            <Route path="/success" element={<Contact />} />

          </Routes>
        </div>

        <Footer />
      </div>
    </ApolloProvider>
  );
}



export default App;