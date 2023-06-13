const db = require('../config/connection');
const { User, Deck, Listing, Post } = require('../models');
const userSeeds = require('./userSeeds.json');
const deckSeeds = require('./deckSeeds.json');
const listingSeeds = require('./listingSeeds.json');
const postSeeds = require('./postSeeds.json')

db.once('open', async () => {
  try {
    await Deck.deleteMany({});
    await User.deleteMany({});
    await Post.deleteMany({})
    await Listing.deleteMany({})

    await User.create(userSeeds);

    for (let i = 0; i < deckSeeds.length; i++) {
      const { _id, deckOwner } = await Deck.create(deckSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: deckOwner },
        {
          $addToSet: {
            decks: _id,
          },
        }
      );
    }

    for (let i = 0; i < listingSeeds.length; i++) {
      const { _id, seller } = await Listing.create(listingSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: seller },
        {
          $addToSet: {
            listings: _id,
          },
        }
      );
    }

    for (let i = 0; i < postSeeds.length; i++) {
      const { _id, postOwner } = await Post.create(postSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username:postOwner },
        {
          $addToSet: {
            posts: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  
  console.log('all done!');
  process.exit(0);
});
