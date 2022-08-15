const models = require('../handlers/getModels');

exports.getAllBoards = async (req, res) => {
	try {
		const boards = await models.Boards.findAll();
		res.status(200).json(boards);
	} catch (error) {
		res.status(500).send(error);
	}
};

exports.getUserBoards = async (req, res) => {
	try {
		const { userId } = req.params;
		const boards = await models.Boards.findAll({
			where: { userId: userId },
		});
		res.status(200).json(boards);
	} catch (error) {
		res.status(500).send(error);
	}
};
