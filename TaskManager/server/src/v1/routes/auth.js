const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

/* GET ALL USERS */
router.get('/', authController.getAllUsers);

router.post('/login');

router.post('/signup');

module.exports = router;
