const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		'tasks',
		{
			taskId: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			isCompleted: {
				type: DataTypes.TINYINT,
				allowNull: false,
			},
			boardId: {
				type: DataTypes.STRING(100),
				allowNull: false,
				references: {
					model: 'boards',
					key: 'boardId',
				},
			},
		},
		{
			sequelize,
			tableName: 'tasks',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'taskId' }],
				},
				{
					name: 'taskId_UNIQUE',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'taskId' }],
				},
				{
					name: 'boardId_idx',
					using: 'BTREE',
					fields: [{ name: 'boardId' }],
				},
			],
		}
	);
};
