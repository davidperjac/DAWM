const express = require('express');
const router = express.Router();

/* RENDER HOME PAGE. */
router.get('/', (req, res) => {
	res.render('index');
});

/* ROUTES. */
router.use('/auth', require('./auth.routes'));
router.use('/boards', require('./board.routes'));
router.use('/tasks', require('./task.routes'));

module.exports = router;
