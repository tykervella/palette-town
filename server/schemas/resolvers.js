const { AuthenticationError } = require('apollo-server-express');
const { User, Deck, Listing, Post } = require('../models');
const { signToken } = require('../utils/auth');
const { ObjectId } = require('mongodb');

// Helper function to find a deck by ID
async function findDeckById(deckId) {
  try {
    const deck = await Deck.findById(deckId);
    return deck;
  } catch (error) {
    throw new Error('Error finding deck');
  }
}

const resolvers = {

  Post: {
    captureCount: (parent) => parent.caughtUsers.length,
  },

  Query: {
    
    users: async () => {
      return User.find()
        .populate('decks')
        .populate('listings')
        .populate('posts')
        .populate('cart')
        .populate('caughtPosts');
    },

    user: async (parent, { username }) => {
      return User.findOne({ username })
        .populate('decks')
        .populate('listings')
        .populate('posts')
        .populate('cart')
        .populate('caughtPosts');
    },
   
    decks: async (parent, { username }) => {
      const params = username ? { deckOwner: username } : {};
      return Deck.find(params)
        .sort({ createdAt: -1 });
    },

    deck: async (parent, { deckId }) => {
      return Deck.findOne({ _id: deckId });
    },

    deckForPost: async (parent, { deckName }) => {
      return Deck.findOne({ deckName: deckName });
    },

    listings: async (parent, { username }) => {
      const params = username ? { seller: username } : {};
      return Listing.find(params)
        .sort({ createdAt: -1 });
    },

    listing: async (parent, { listingId }, context) => {
      return await Listing.findOne({ _id: ObjectId(listingId) });
    },

    allListings: async () => {
      return Listing.find();
    },

    posts: async () => {
      const posts = await Post.find()
        .populate('caughtUsers');
      
        return posts
          .sort((a, b) => b.captureCount - a.captureCount);
    },

    post: async (parent, { postId }) => {
      return Post.findOne({ _id: postId })
        .populate('caughtUsers');
    },
  
  },

  Mutation: {

    addUser: async (parent, { 
      username, 
      email, 
      password, 
      name, 
      bio, 
      profileIMG 
    }) => {
      const user = await User.create({ 
        username: username, 
        email: email, 
        password: password,
        name: name, 
        bio: bio,  
        profileIMG : profileIMG
      });
    
      const token = signToken(user);
      return { token, user };
    },
    

    login: async (parent, { 
      email, 
      password 
    }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

   
    

    addDeck: async (parent, { 
      deckOwner, 
      deckName 
    }) => {
      const deck = await Deck.create({ 
        deckOwner: deckOwner, 
        deckName: deckName 
      });

      await User.findOneAndUpdate(
        { username: deckOwner },
        { $addToSet: { decks: deck._id } }
      );

      return deck;
    },

    addListing: async (parent, { 
      cardId, 
      cardName, 
      cardImage, 
      cardType, 
      superType, 
      price, 
      seller 
    }) => {
      const newListing = await Listing.create({
        cardId: cardId,
        cardName: cardName,
        cardImage: cardImage,
        cardType: cardType,
        superType: superType,
        price: price,
        seller: seller,
      });

      await User.findOneAndUpdate(
        { username: seller },
        { $addToSet: { listings: newListing._id } }
      );

      return newListing;
    },

    addPost: async (parent, {
      postOwner,
      postName,
      deckName,
      postText,
      color1,
      color2,
      color3,
      color4,
      color5,
      image1,
      image2,
      image3,
      image4,
      image5
    }) => {
      const newPost = await Post.create({
        postOwner: postOwner,
        postName: postName,
        deckName: deckName,
        postText: postText,
        color1: color1,
        color2: color2,
        color3: color3,
        color4: color4,
        color5: color5,
        image1: image1,
        image2: image2,
        image3: image3,
        image4: image4,
        image5: image5
      });
    
      await User.findOneAndUpdate(
        { username: postOwner },
        { $addToSet: { posts: newPost._id } }
      );
    
      return newPost;
    },

    addToCart: async (_, { username, listingId }) => {
      const user = await User.findOne({ username: username });
      if (!user) throw new Error('No user found with this username');
      user.cart.push(listingId);
      await user.save();
      return user;
    },

    addToCaughtPosts: async (_, { username, postId }) => {
      const user = await User.findOne({ username: username });
      if (!user) throw new Error('No user found with this username');
      user.caughtPosts.push(postId);
      await user.save();
      return user;
    },
    
    addToCaughtUsers: async (_, {  postId, userId}) => {
      const post = await Post.findById(postId);
      post.caughtUsers.push(userId);
      await post.save();
      return post;
    },

    
    addCardToDeckList: async (_, { 
      deckId, 
      cardId, 
      cardName, 
      cardImage, 
      cardType, 
      superType 
    }) => {

      // Find the deck by deckId and add the card
      const deck = await findDeckById(deckId);
      if (!deck) {
        throw new Error('Deck not found');
      }

      const newCard = {
        cardId: cardId,
        cardName: cardName,
        cardImage: cardImage,
        cardType: cardType,
        superType: superType,
      };
      deck.cards.push(newCard);

      // Save the updated deck to the database or any storage
      await deck.save();
      return deck;
    },

    removeCard: async (parent, { 
      deckId, 
      cardId 
    }) => {
      const updatedDeck = await Deck.findOneAndUpdate(
        { _id: deckId },
        { $pull: { cards: {cardId: cardId } } },
        { new: true }
      );

      return updatedDeck;
    },

    removeListing: async (parent, { listingId }) => {
      const listing = await Listing.findOneAndDelete({ _id: listingId });
    
      return listing;
    },
    

    removeFromCart: async (_, { username, listingId }) => {
      const user = await User.findOne({ username: username });
      if (!user) throw new Error('No user found with this username');
      const index = user.cart.indexOf(listingId);
      if (index > -1) {
        user.cart.splice(index, 1);
      }
      await user.save();
      return user;
    },
  

    updateCardQuantity: async (parent, { 
      deckId, 
      cardId, 
      quantity 
    }) => {
      const deck = await findDeckById(deckId);
      if (!deck) {
        throw new Error('Deck not found');
      }

      const card = deck.cards.find((card) =>
        card.cardId === cardId);
      if (!card) {
        throw new Error('Card not found in the deck');
      }

      card.quantity = quantity;
      await deck.save();

      return deck;
    },
  },
};

module.exports = resolvers;
