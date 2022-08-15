const express = require('express');
const router = express.Router();

/* RENDER HOME PAGE. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

/* ROUTES. */
router.use('/auth', require('./auth.routes'));
router.use('/boards', require('./board.routes'));
router.use('/boards/:boardId/tasks', require('./task.routes'));

module.exports = router;
