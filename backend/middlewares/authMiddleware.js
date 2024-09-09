const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Split 'Bearer <token>'

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' }); // Invalid token case
      }

      req.user = user; // Attach the decoded user info to req.user
      next(); // Proceed to the next middleware/route handler
    });
  } else {
    return res.status(403).json({ message: 'Authorization token required' });
  }
};


module.exports = authenticateJWT;



