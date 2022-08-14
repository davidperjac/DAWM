const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		'Boards',
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
				unique: 'name_UNIQUE',
			},
			description: {
				type: DataTypes.STRING(45),
				allowNull: false,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'Users',
					key: 'userId',
				},
			},
		},
		{
			sequelize,
			tableName: 'Boards',
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
					name: 'name_UNIQUE',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'name' }],
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
