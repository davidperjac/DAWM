const models = require('../handlers/getModels');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
	models.Users.findAll()
		.then((users) => {
			res.json(users);
		})
		.catch((error) => res.status(400).send(error));
};

exports.register = async (req, res) => {
	try {
		const { username, password } = req.body;

		const existingUserByUsername = await models.Users.findAll({
			where: { username: username },
		});
		if (existingUserByUsername.length !== 0)
			return res.status(409).send('Username already exist');

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await models.Users.create({
			username: username,
			password: hashedPassword,
		});
		res.status(201).json({ user });
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.login = async (req, res) => {
	try {
	} catch (error) {
		res.status(500).json(error);
	}
};
