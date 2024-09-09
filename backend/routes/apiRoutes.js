const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiControllers.js');
const authenticateJWT = require('../middlewares/authMiddleware.js');


// Routes for user-related operations
router.get('/api/:id_user', apiController.getApi);
router.post('/api', apiController.insertApi);


module.exports = router;
