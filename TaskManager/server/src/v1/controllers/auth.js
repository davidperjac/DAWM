const models = require('../handlers/getModels');

exports.getAllUsers = async (req, res) => {
	models.Users.findAll()
		.then((users) => {
			res.json(users);
		})
		.catch((error) => res.status(400).send(error));
};

exports.login = async (req, res) => {};

exports.signup = async (req, res) => {};
