'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		return await queryInterface.createTable('Users', {
			userId: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			username: {
				type: Sequelize.DataTypes.STRING(45),
				allowNull: false,
				unique: 'username_UNIQUE',
			},
			password: {
				type: Sequelize.DataTypes.STRING(100),
				allowNull: false,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		return await queryInterface.dropTable('Users');
	},
};
