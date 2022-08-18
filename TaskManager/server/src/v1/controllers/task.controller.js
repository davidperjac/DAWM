const axios = require('axios');
const firebaseUrl =
	'https://task-manager-f870e-default-rtdb.firebaseio.com/collection.json';

exports.getTasks = async (req, res) => {
	try {
		const tasks = await axios.get(firebaseUrl);
		res.status(200).send(tasks.data);
	} catch (error) {
		console.log(error);
		res.status(500).send({ error });
	}
};
