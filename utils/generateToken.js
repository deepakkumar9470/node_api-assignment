const jwt = require('jsonwebtoken');



const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "20m",
  });
};


module.exports = generateToken;