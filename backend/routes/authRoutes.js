const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController.js');
const authenticateJWT = require('../middlewares/authMiddleware.js');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route (only accessible to authenticated users)
router.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
