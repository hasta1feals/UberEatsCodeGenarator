const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

// Routes for user-related operations
router.get('/users', userController.getAllUsers);
router.get('/test', userController.intTest);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.get('/', userController.test);


module.exports = router;
