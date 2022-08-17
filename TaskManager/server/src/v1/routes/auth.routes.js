const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

/* GET ALL USERS */
router.get('/', authController.getAllUsers);

/* GET USER BY ID */
router.get('/:id', authController.getUserById);

/* REGISTER USER */
router.post('/register', authController.register);

/* LOGIN USER */
router.post('/login', authController.login);

/* CHECK JWT */
router.post('/verify-token', authController.verifyToken);

module.exports = router;
