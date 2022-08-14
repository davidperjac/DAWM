const express = require('express');
const router = express.Router();

const sequelize = require('../models/index').sequelize;
const initModels = require('../models/init-models');
const models = initModels(sequelize);

/* GET ALL BOARDS */
router.get('/', function (req, res, next) {
	models.Boards.findAll({
		include: [
			{
				model: models.Users,
				as: 'user',
			},
		],
	})
		.then((boards) => {
			res.json(boards);
		})
		.catch((error) => res.status(400).send(error));
});

module.exports = router;
