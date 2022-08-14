const { Sequelize } = require('sequelize');
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		'Users',
		{
			userId: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			username: {
				type: DataTypes.STRING(45),
				allowNull: false,
				unique: 'username_UNIQUE',
			},
			password: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: 'Users',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'userId' }],
				},
				{
					name: 'userId_UNIQUE',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'userId' }],
				},
				{
					name: 'username_UNIQUE',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'username' }],
				},
			],
		}
	);
};
