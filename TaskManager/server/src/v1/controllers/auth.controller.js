const models = require('../handlers/getModels');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
	try {
		const users = await models.users.findAll();
		res.json(users);
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.getUserById = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await models.users.findAll({
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
		const existingUserByUsername = await models.users.findAll({
			where: { username: username },
		});
		if (existingUserByUsername.length !== 0)
			return res.status(409).send('Username already exist');

		const hashedPassword = await bcrypt.hash(password, 10);

		await models.users.create({
			username: username,
			password: hashedPassword,
		});
		res.status(201).json('User created successfully');
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await models.users.findAll({ where: { username: username } });
		if (user.length === 0) return res.status(401).send('Invalid credentials');

		const hashedPassword = user[0].dataValues.password;
		const passwordMatch = await bcrypt.compare(password, hashedPassword);
		if (!passwordMatch) return res.status(401).send('Invalid credentials');

		const token = jsonwebtoken.sign(
			{ id: user[0].dataValues.userId },
			process.env.JWT_KEY,
			{
				expiresIn: '24h',
			}
		);
		res.status(200).json({ user, token });
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.verifyToken = async (req, res) => {
	try {
		const tokenDecoded = jsonwebtoken.verify(
			req.body.token,
			process.env.JWT_KEY
		);
		if (!tokenDecoded) res.status(401).send('Unauthorized');

		const user = await models.users.findAll({
			where: { userId: tokenDecoded.id },
		});

		if (user.length === 0) return res.status(401).send('Unauthorized');
		res.status(200).send(true);
	} catch (error) {
		res.status(500).send('Unauthorized');
	}
};
