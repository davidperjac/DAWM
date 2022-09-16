const models = require('../handlers/getModels');

exports.getAllBoards = async (req, res) => {
	try {
		const boards = await models.boards.findAll();
		res.status(200).json(boards);
	} catch (error) {
		res.status(500).send(error);
	}
};

exports.getUserBoards = async (req, res) => {
	try {
		const { userId } = req.params;
		const boards = await models.boards.findAll({
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
		const checkBoard = await models.boards.findAll({
			where: {
				userId: userId,
				name: name,
			},
		});

		if (checkBoard.length !== 0)
			return res.status(400).send('Board name already in used');

		await models.boards.create({
			name: name,
			description: description,
			userId: userId,
		});
		res.status(201).json('Board created successfully');
	} catch (error) {
		res.status(500).send(error);
	}
};

exports.deleteBoard = async (req, res) => {
	try {
		const { boardId } = req.params;

		await models.boards.destroy({
			where: {
				boardId: boardId,
			},
		});
		res.status(200).json('Board deleted successfully');
	} catch (error) {
		res.status(500).send(error);
	}
};
