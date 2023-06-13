const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';
module.exports = {
  
  signToken: function ({ email, username, _id, profileIMG }) {
    const payload = { email, username, _id, profileIMG }; // Include profileIMG field
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

