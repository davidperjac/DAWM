const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board.controller');

/* GET ALL BOARDS */
router.get('/', boardController.getAllBoards);

/* ADD BOARD */
router.post('/', boardController.addBoard);

/* GET USER  BOARDS */
router.get('/:userId', boardController.getUserBoards);

/* GET BOARD */
router.get('/:boardId', boardController.getBoard);

/* DELETE BOARD */
router.delete('/:boardId', boardController.deleteBoard);

module.exports = router;
