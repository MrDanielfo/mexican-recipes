require('dotenv').config({ path: 'variables.env' });
const jwt = require('jsonwebtoken');

const getCurrentUser = (req) => {
     try {
          const token = req.headers['authorization'];
          if (typeof token === typeof undefined) return req;
          // console.log(token)
          if (token !== null) {
               try {
                    const currentUser = jwt.verify(token, process.env.SECRET);
                    return req.currentUser = currentUser;
               } catch (err) {
                    console.log(err);
               }
          }
     } catch (err) {
          console.log(err)
     }
};

module.exports = {
     getCurrentUser
}