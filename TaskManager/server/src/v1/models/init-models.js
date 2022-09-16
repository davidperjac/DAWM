const DataTypes = require('sequelize').DataTypes;
const _boards = require('./boards');
const _tasks = require('./tasks');
const _users = require('./users');

function initModels(sequelize) {
	const boards = _boards(sequelize, DataTypes);
	const tasks = _tasks(sequelize, DataTypes);
	const users = _users(sequelize, DataTypes);

	tasks.belongsTo(boards, { as: 'board', foreignKey: 'boardId' });
	boards.hasMany(tasks, { as: 'tasks', foreignKey: 'boardId' });
	boards.belongsTo(users, { as: 'user', foreignKey: 'userId' });
	users.hasMany(boards, { as: 'boards', foreignKey: 'userId' });

	return {
		boards,
		tasks,
		users,
	};
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
