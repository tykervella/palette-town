const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type User {
  _id: ID!
  username: String!
  name: String
  profileIMG: String
  email: String!
  password: String
  decks: [Deck!]
  listings: [Listing!]
  posts: [Post!]
  bio: String
  caughtPosts: [Post!]
  cart: [Listing!]  # Added cart field
}


  type Deck {
    _id: ID!
    deckName: String!
    deckOwner: String!
    createdAt: String 
    cards: [Card!]
  }

  type Card {
    cardId: String!
    cardName: String!
    cardImage: String!
    cardType: String!
    superType: String!
    quantity: Int!
  }

  type Post {
    _id: ID!
    postOwner: String!
    postName: String!
    deckName: String!
    postText: String
    createdAt: String
    color1: String!
    color2: String!
    color3: String!
    color4: String!
    color5: String!
    image1: String!
    image2: String!
    image3: String!
    image4: String!
    image5: String!
    caughtUsers: [User!]
    captureCount: Int!
  }

  type Listing {
    _id: ID!
    cardId: String!
    cardName: String!
    cardImage: String!
    cardType: String!
    superType: String!
    price: Float!
    seller: String! 
    createdAt: String
    # ... other card fields
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    decks(username: String!): [Deck]
    deck(deckId: ID!): Deck
    deckForPost(deckName: String!): Deck
    listings(username: String!): [Listing]
    listing(listingId: ID!): Listing
    allListings: [Listing]
    posts: [Post]
    post(postId: ID!): Post
    # filteredListings(searchQuery: String, selectedTypes: [String!], selectedColors: [String!]): [Listing]
    # sortedListings(sortOption: String): [Listing]
  }

  type Mutation {
    login(
      email: String! 
      password: String!
    ): Auth

    addUser(
      username: String! 
      email: String!
      password: String!
      name: String 
      bio: String   
      profileIMG: String  
    ): Auth
    
    addDeck(
      deckOwner: String!
      deckName: String!
    ): Deck


    addListing(
      cardId: String!
      cardName: String!
      cardImage: String!
      cardType: String!
      superType: String!
      price: Float!
      seller: String! 
    ): Listing

    addPost(
      postOwner: String!
      postName: String!
      postText: String
      deckName: String!
      color1: String!
      color2: String!
      color3: String!
      color4: String!
      color5: String!
      image1: String!
      image2: String!
      image3: String!
      image4: String!
      image5: String!
    ): Post

    addCardToDeckList(
      deckId: ID!, 
      cardId: String!
      cardName: String!
      cardImage: String!
      cardType: String!
      superType: String!
    ): Deck
    
    addToCaughtUsers(
      postId: ID!
      userId: ID!
    ): Post

    addToCaughtPosts(
      username: String!, 
      postId: ID!
    ): User
    
    addToCart(
      username: String!, 
      listingId: ID!
    ): User
    
    removeCard(
      deckId: ID!
      cardId: String!
    ): Deck

    removeFromCart(
      username: String!
      listingId: ID!
    ): User

    removeListing(
      listingId: ID!
    ): Listing

    updateCardQuantity(
      deckId: ID! 
      cardId: ID! 
      quantity: Int!
    ): Deck

    
  
    }


`;

module.exports = typeDefs;
