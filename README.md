# Palette Town [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![Logo](client/src/components/Navbar/assets/pallet-town-logo.png)



## Welcome to [Palette Town](https://palette-town.herokuapp.com/)! 

Have an interest in Pokémon? Having a tough time thinking of a color palette? Using the open source Pokémon API, you can create a deck of 60 cards then let the application compute a color palette of 5 for you. Share your created decks with the community, and catch your favorites for later! Come create a Pokémon deck and give it a ~vibe~ 

This a full-stack MERN application created for a coding bootcamp through the University of Washington in partnership with edX. It uses graphQL to communicate between the front and back end and is deployed using Heroku. 

--- 

## TABLE OF CONTENTS

- [Description](#welcome-to-palette-town)
- [Usage](#usage)
- [Technologies](#technologies)
- [Contributions](#contributions)
- [Screenshots](#screenshots)
- [License](#license)
- <b>IMPORTANT:</b> You can also view the [previous repository]() to see the commit history, prior to deployment. 

--- 

## USAGE

This application runs in the browser at the deployed link! To start, visit the Homepage to see the most popular color palettes on the site! You can view a post, but to "catch" a palette or access other features of the site, you need to log in or sign up.

Once logged in, you can create a deck or listing, view the marketplace, or check your profile. When creating a deck, you are prompted to name it. Then, you can choose whether to use a starter deck or build your deck from scratch. Afterward, you will be taken to the deck builder for your newly created deck.

In the deck builder, you can search for Pokémon by name, card type, card subtype, and card color on the left side of the screen. On the right side, you can see your deck and adjust the quantity of each card. Once your deck reaches 60 cards, you can publish it.

On the publish page, you can view the cards that make up your deck before giving it a title and description. After publishing, the algorithm creates a five-color palette based on the cards in the associated deck. Now you have your very own palette!

Additionally, you can create a listing by searching through the Pokémon card API. The listings appear in the marketplace, where you can add them to your cart and proceed to checkout using Stripe. Please note that this is only in testing mode, so no actual transactions will take place.

On your profile, you can see your own palettes, decks in progress, and listings.

---


## Technologies

- [Pokémon API](https://docs.pokemontcg.io/) 
- [MongoDB](https://www.mongodb.com/)
- [Express.JS](https://expressjs.com/)
- [React](https://react.dev/) 
- [Node.JS](https://nodejs.org/en)
- [GraphQL](https://graphql.org/)
- [Tailwind CSS](https://tailwindcss.com/) 
- [Sass](https://sass-lang.com/documentation/js-api/)
- [Stripe](https://stripe.com/docs/payments/payment-methods)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction/) 

--- 

## Contributions

| Developers         | GitHub Profile |
| -----------  | ----------- |
|Jackson Maltby | [jacksonmaltby](https://github.com/jacksonmaltby)  |
|Marley Schneider|[marleyschneiderr](https://github.com/marleyschneiderr)
|Tyler Kervella |[tykervella](https://github.com/tykervella)
|Terri Mack|[terrinmack](https://github.com/terrinmack) |

--- 

## Screenshots

![Homepage](/client/src/assets/homepage.png)
![Login/Sign](/client/src/assets/signup.png)
![Profile](/client/src/assets/profilePage.png)
![Create Deck Home](/client/src/assets/CreateDeckHome.png)
![Create Deck](/client/src/assets/CreateDeck.png)
![Publish Deck](/client/src/assets/publishDeck.png)
![View Post](/client/src/assets/viewPost.png)
![Marketplace](/client/src/assets/marketplace.png)
![Create Listing](/client/src/assets/createListing.png)
![Checkout](/client/src/assets/checkout.png)

---

## License 

MIT License
      Copyright (c) 2023 tykervella
      
      Permission is hereby granted, free of charge, to any person obtaining a copy
      of this software and associated documentation files (the "Software"), to deal
      in the Software without restriction, including without limitation the rights
      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
      copies of the Software, and to permit persons to whom the Software is
      furnished to do so, subject to the following conditions:
      
      The above copyright notice and this permission notice shall be included in all
      copies or substantial portions of the Software.
      
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.