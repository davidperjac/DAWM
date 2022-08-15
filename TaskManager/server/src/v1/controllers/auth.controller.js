const models = require('../handlers/getModels');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
	try {
		const users = await models.Users.findAll();
		res.json(users);
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.getUserById = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await models.Users.findAll({
			where: { userId: id },
		});
		res.status(200).send(user);
	} catch (error) {
		res.status(500).json(error);
	}
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
		const { username, password } = req.body;
		const user = await models.Users.findAll({ where: { username: username } });
		if (user.length === 0) return res.status(401).send('Invalid credentials');

		const hashedPassword = user[0].dataValues.password;
		const passwordMatch = await bcrypt.compare(password, hashedPassword);
		if (!passwordMatch) return res.status(401).send('Invalid credentials');

		const token = jsonwebtoken.sign({ id: user.id }, process.env.JWT_KEY, {
			expiresIn: '24h',
		});
		res.status(200).json({ user, token });
	} catch (error) {
		res.status(500).json(error);
	}
};
