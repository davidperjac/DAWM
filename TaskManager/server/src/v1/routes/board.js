const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board');

/* GET ALL BOARDS */
router.get('/', boardController.getAllBoards);

module.exports = router;
