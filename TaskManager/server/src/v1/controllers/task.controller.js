const models = require('../handlers/getModels');

exports.getAllTasks = async (req, res) => {
	try {
		const tasks = await models.tasks.findAll();
		res.status(200).send(tasks);
	} catch (error) {
		res.status(500).send({ error });
	}
};

exports.getTasks = async (req, res) => {
	try {
		const { boardId } = req.params;

		const tasks = await models.tasks.findAll({
			where: { boardId: boardId },
		});

		res.status(200).send(tasks);
	} catch (error) {
		res.status(500).send({ error });
	}
};

exports.addTask = async (req, res) => {
	try {
		const { boardId } = req.params;
		const { name } = req.body;

		const checkTask = await models.tasks.findAll({
			where: {
				boardId: boardId,
				name: name,
			},
		});

		if (checkTask.length !== 0)
			return res.status(400).send('Task name already in used');

		await models.tasks.create({
			name: name,
			boardId: boardId,
			isCompleted: 0,
		});

		res.status(201).json('Task created successfully');
	} catch (error) {
		res.status(500).send({ error });
	}
};

exports.deleteTask = async (req, res) => {
	try {
		const { taskId } = req.params;

		await models.tasks.destroy({
			where: {
				taskId: taskId,
			},
		});

		res.status(200).json('Task deleted successfully');
	} catch (error) {
		res.status(500).send({ error });
	}
};

exports.completeTask = async (req, res) => {
	try {
		const { taskId } = req.params;

		const updatedTask = await models.tasks.findAll({
			where: { taskId: taskId },
		});

		const isCompleted = updatedTask[0].dataValues.isCompleted;

		await models.tasks.update(
			{ isCompleted: !Boolean(isCompleted) },
			{
				where: {
					taskId: taskId,
				},
			}
		);

		res.status(200).json('Task updated successfully');
	} catch (error) {
		res.status(500).send({ error });
	}
};
