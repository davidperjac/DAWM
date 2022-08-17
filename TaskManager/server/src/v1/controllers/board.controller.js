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

exports.addBoard = async (req, res) => {
	try {
		const { userId } = req.params;
		const { name, description } = req.body;
		const board = await models.Boards.create({
			name: name,
			description: description,
			userId: userId,
		});
		res.status(201).json({ board });
	} catch (error) {
		res.status(500).send(error);
	}
};

exports.deleteBoard = async (req, res) => {};
