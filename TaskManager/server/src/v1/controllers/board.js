const models = require('../handlers/getModels');

exports.getAllBoards = async (req, res) => {
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
};
