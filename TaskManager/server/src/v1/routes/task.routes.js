const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

/* GET TASKS */
router.get('/:boardId', taskController.getTasks);

/* ADD TASK */
router.post('/:boardId', taskController.addTask);

/* DELETE TASK */
router.delete('/:taskId', taskController.deleteTask);

module.exports = router;
