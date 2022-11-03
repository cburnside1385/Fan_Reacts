const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'testtoken';
const expiration = '8h';

module.exports = {
    signToken: function ({ username, email, _id }) {
        const payload = { username, email, _id };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
    authMiddleware: function ({req }) {
   
        let token = req.body.token || req.query.token || req.headers.authorization;
        
    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
        return req;
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    
        }
        return req;  
  },
 
    
};
