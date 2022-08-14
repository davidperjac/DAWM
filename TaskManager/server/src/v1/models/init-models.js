var DataTypes = require('sequelize').DataTypes;
var _Boards = require('./Boards');
var _Users = require('./Users');

function initModels(sequelize) {
	var Boards = _Boards(sequelize, DataTypes);
	var Users = _Users(sequelize, DataTypes);

	Boards.belongsTo(Users, { as: 'user', foreignKey: 'userId' });
	Users.hasMany(Boards, { as: 'Boards', foreignKey: 'userId' });

	return {
		Boards,
		Users,
	};
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
