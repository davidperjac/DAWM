const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

/* GET ALL TASKS */
router.get('/',taskController.getAllTasks)

/* GET TASKS */
router.get('/:boardId', taskController.getTasks);

/* ADD TASK */
router.post('/:boardId', taskController.addTask);

/* DELETE TASK */
router.delete('/:taskId', taskController.deleteTask);

/* COMPLETE TASK */
router.put('/:taskId', taskController.completeTask);

module.exports = router;
