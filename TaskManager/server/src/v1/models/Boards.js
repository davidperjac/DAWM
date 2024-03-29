const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		'boards',
		{
			boardId: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING(45),
				allowNull: false,
			},
			description: {
				type: DataTypes.STRING(45),
				allowNull: false,
			},
			userId: {
				type: DataTypes.STRING(100),
				allowNull: false,
				references: {
					model: 'users',
					key: 'userId',
				},
			},
		},
		{
			sequelize,
			tableName: 'boards',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'boardId' }],
				},
				{
					name: 'boardsId_UNIQUE',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'boardId' }],
				},
				{
					name: 'userId_idx',
					using: 'BTREE',
					fields: [{ name: 'userId' }],
				},
			],
		}
	);
};
