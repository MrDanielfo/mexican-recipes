const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createToken = (user, secret, expiresIn) => {
     const { username, email } = user;
     return jwt.sign({ username, email}, secret, {expiresIn} )
}

const getUser = async (username) => {
     try {
          return await User.findOne({username})
                                   .populate(
                                        {path: 'favorites', model: 'Recipe'}
                                   );
     } catch (err) {
          console.log(err)
     }
}

const createUser = async (user) => {
     try {
          const newUser = await User.create(user);
          return newUser;
     } catch (err) {
          console.log(err)
     }
}

const checkPassword = async (password, userPassword) => {
     const isValidPassword = await bcrypt.compare(password, userPassword);
     if (!isValidPassword) {
          return false;
     }
     return true; 
}

const updateFavoriteUser = async (filter, update) => {
     try {
          const user = User.findOneAndUpdate(filter, update);
          return user;
     } catch (err) {
          console.log(err);
     }
}

module.exports = {
     createToken,
     getUser,
     createUser,
     checkPassword,
     updateFavoriteUser
}
