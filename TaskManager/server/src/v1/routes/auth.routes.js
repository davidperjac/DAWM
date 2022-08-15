const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

/* GET ALL USERS */
router.get('/', authController.getAllUsers);

/* GET USER BY ID */
router.get('/:id', authController.getUserById);

/* REGISTER USERS */
router.post('/register', authController.register);

/* GET ALL USERS */
router.post('/login', authController.login);

// router.post('/verify-token', tokenHandler.verifyToken, (req, res) => {
// 	res.status(200).json({ user: req.user });
// });

module.exports = router;
