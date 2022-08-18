const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

/* GET TASKS */
router.get('/', taskController.getTasks);

module.exports = router;
