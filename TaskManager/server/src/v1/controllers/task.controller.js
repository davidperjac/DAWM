const axios = require('axios');
const firebaseUrl =
	'https://task-manager-f870e-default-rtdb.firebaseio.com/collection.json';

exports.getTasks = async (req, res) => {
	try {
		const { boardId } = req.params;
		const { data } = await axios.get(firebaseUrl);
		const boardTasks = data.filter((x) => x.boardId === boardId);
		res.status(200).send(boardTasks);
	} catch (error) {
		res.status(500).send({ error });
	}
};
