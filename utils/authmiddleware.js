const jwt = require('jsonwebtoken')

const jwtToken = async (obj) => {
    try {
        const token = jwt.sign({obj}, process.env.JWT_SECRET, {expiresIn: '1d'})
        // console.log(token)
        return token;
    } catch (err) {
        console.log('Error in token', err);
        throw new Error(err)
    }
}

const verifyjwt = async (req, res, next) => {
    try {
        const decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        // console.log(decode)
        next() ;
    } catch (err) {
        console.log('Error in token', err);
        throw new Error(err)
    }
}

const decodeToken = async (token) => {
    try {
      const decoded = jwt.decode(token);
      return decoded;
    } catch (err) {
      console.error('Invalid token:', err.message);
      return null;
    }
  }

module.exports = {
    jwtToken, verifyjwt, decodeToken
}