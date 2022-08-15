const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board.controller');

/* GET ALL BOARDS */
router.get('/', boardController.getAllBoards);

/* GET USER  BOARDS */
router.get('/:userId', boardController.getUserBoards);

module.exports = router;
