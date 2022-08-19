const firebaseDB = require('../utils/firebase');
const { ref, child, get, set } = require('firebase/database');
const dbRef = ref(firebaseDB);

exports.getTasks = async (req, res) => {
	try {
		const { boardId } = req.params;

		const data = await get(child(dbRef, '/'));

		const boards = data.val().collection;
		const boardTasks = boards.filter((x) => x.boardId === boardId);
		res.status(200).send(boardTasks);
	} catch (error) {
		res.status(500).send({ error });
	}
};

exports.addTask = async (req, res) => {
	try {
		const { boardId } = req.params;
		const { name } = req.body;

		const data = await get(child(dbRef, '/'));
		const boards = data.val().collection;

		if (boards.some((b) => b.name === name && b.boardId === boardId)) {
			return res.status(400).json('Task name already in use');
		}

		const date = new Date();
		const newBoard = {
			name: name,
			boardId: boardId,
			isCompleted: false,
			createdAt: 'hoy',
			id: boards[boards.length - 1].id + 1,
		};

		const collection = [...boards, newBoard];
		set(ref(firebaseDB, '/'), {
			collection,
		});

		res.status(201).json('Task created successfully');
	} catch (error) {
		res.status(500).send({ error });
	}
};

exports.deleteTask = async (req, res) => {
	try {
		const { taskId } = req.params;

		const data = await get(child(dbRef, '/'));
		const tasks = data.val().collection;

		const collection = tasks.filter((t) => t.id !== parseInt(taskId));

		set(ref(firebaseDB, '/'), {
			collection,
		});
		res.status(201).json('Task deleted successfully');
	} catch (error) {
		res.status(500).send({ error });
	}
};

exports.completeTask = async (req, res) => {};
