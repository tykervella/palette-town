const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
require('dotenv').config();
const cors = require('cors');




const stripe = require('stripe')(process.env.SK_TEST_KEY);



const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.post('/create-checkout-session', async (req, res) => {
  const cart = req.body.cart;
  const line_items = cart.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.cardName,
      },
      unit_amount: item.price * 100, // Stripe requires amount in cents
    },
    quantity: 1, // adjust this if you have quantity feature in your cart
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: `http://localhost:3000/checkout`,
    cancel_url: `http://localhost:3001/checkout`,
  });

  res.json({ id: session.id });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

// Call the async function to start the server
startApolloServer();

