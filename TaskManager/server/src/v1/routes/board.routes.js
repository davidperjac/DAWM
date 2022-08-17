const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board.controller');

/* GET ALL BOARDS */
router.get('/', boardController.getAllBoards);

/* GET USER  BOARDS */
router.get('/:userId', boardController.getUserBoards);

/* ADD BOARD */
router.post('/:userId', boardController.addBoard);

/* DELETE BOARD */
router.delete('/:boardId', boardController.deleteBoard);

module.exports = router;
