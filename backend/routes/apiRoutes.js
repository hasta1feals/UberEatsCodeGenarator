const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiControllers.js');
const openAi = require('../controllers/openApiController.js');
const authenticateJWT = require('../middlewares/authMiddleware.js');




// Routes for user-related operations
router.get('/api/:id_user', apiController.getApi);
router.post('/apiKey/:id_user', apiController.insertApi);
router.post('/ai-response', openAi.getAIResponse);


module.exports = router;
