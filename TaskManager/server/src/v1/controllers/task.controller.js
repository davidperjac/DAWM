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

		dbRef.push({
			boardId: boardId,
			name: name,
			completed: false,
		});

		res.status(200).send('Task added succesfully');
	} catch (error) {
		res.status(500).send({ error });
	}
};

exports.deleteTask = async (req, res) => {};

exports.completeTask = async (req, res) => {};
