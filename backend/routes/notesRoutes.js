const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesControllers.js');
const authenticateJWT = require('../middlewares/authMiddleware.js');


// Routes for user-related operations
router.get('/notes/:id_user',authenticateJWT, notesController.getNotes);
router.post('/notes',authenticateJWT, notesController.createNotes);


module.exports = router;
