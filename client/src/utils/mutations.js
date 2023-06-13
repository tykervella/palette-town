import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation AddPost(
    $postOwner: String!
    $postName: String!
    $deckName: String!
    $color1: String!
    $color2: String!
    $color3: String!
    $color4: String!
    $color5: String!
    $image1: String!
    $image2: String!
    $image3: String!
    $image4: String!
    $image5: String!
    $postText: String
  ) {
    addPost(
      postOwner: $postOwner
      postName: $postName
      deckName: $deckName
      color1: $color1
      color2: $color2
      color3: $color3
      color4: $color4
      color5: $color5
      image1: $image1
      image2: $image2
      image3: $image3
      image4: $image4
      image5: $image5
      postText: $postText
    ) {
      _id
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation(
    $username: String!, 
    $email: String!, 
    $password: String!, 
    $name: String, 
    $bio: String, 
    $profileImg: String
  ) {
    addUser(
      username: $username, 
      email: $email, 
      password: $password, 
      name: $name, 
      bio: $bio, 
      profileIMG: $profileImg) {
    user {
      username
    }
  }
}
`;

export const CREATE_DECK = gql`
  mutation Mutation($deckOwner: String!, $deckName: String!) {
  addDeck(deckOwner: $deckOwner, deckName: $deckName) {
    _id
  }
}
`

export const ADD_TO_DECK = gql`
  mutation AddCardToDeckList(
  $deckId: ID!,
  $cardId: String!,
  $cardName: String!
  $cardImage: String!
  $cardType: String!
  $superType: String!
) {
  addCardToDeckList(
    deckId: $deckId
    cardId: $cardId
    cardName: $cardName
    cardImage: $cardImage
    cardType: $cardType
    superType: $superType
  ) {
    cards {
      cardName
    }
  }
}
`


export const ADD_LISTING = gql`
  mutation AddListing(
    $cardId: String!, 
    $cardName: String!, 
    $cardImage: String!, 
    $cardType: String!, 
    $superType: String!, 
    $price: Float!, 
    $seller: String!
  ) {
    addListing(
      cardId: $cardId, 
      cardName: $cardName, 
      cardImage: $cardImage, 
      cardType: $cardType, 
      superType: $superType, 
      price: $price, 
      seller: $seller) {
    _id
  }
}`

export const ADD_TO_CART = gql`
  mutation AddToCart(
    $username: String!, 
    $listingId: ID!
  ) {
    addToCart(
      username: $username, 
      listingId: $listingId
    ) {
    _id
    listings {
      _id
    }
  }
}
`

export const ADD_TO_CAUGHT_POSTS = gql`
  mutation Mutation(
    $username: String!, 
    $postId: ID!
  ) {
    addToCaughtPosts(
      username: $username, 
      postId: $postId
    ) {
      _id
  }
}`

export const ADD_TO_CAUGHT_USERS = gql`
  mutation AddToCaughtUsers(
    $postId: ID!, 
    $userId: ID!
  ) {
    addToCaughtUsers(
      postId: $postId, 
      userId: $userId
    ) {
      _id
  }
}`

export const REMOVE_CARD = gql`
  mutation Mutation($deckId: ID!, $cardId: String!) {
    removeCard(deckId: $deckId, cardId: $cardId) {
      cards {
        cardName
      }
    }
}`

export const REMOVE_LISTING = gql`
mutation Mutation($listingId: ID!) {
  removeListing(listingId: $listingId) {
    _id
  }
}
`;

export const UPDATE_CARD_QUANTITY = gql`
  mutation Mutation(
    $deckId: ID! 
    $cardId: ID! 
    $quantity: Int!
  ) {
  updateCardQuantity(
    deckId: $deckId 
    cardId: $cardId 
    quantity: $quantity
  ) {
    cards {
      quantity
    }
  }
}`

export const REMOVE_FROM_CART = gql`
  mutation Mutation(
    $username: String!, 
    $listingId: ID!
  ) {
    removeFromCart(
      username: $username, 
      listingId: $listingId
    ) {
      cart {
        _id
      }
    }
  }`


