'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		// await queryInterface.bulkInsert(
		// 	'Users',
		// 	[
		// 		{
		// 			userId: 1,
		// 			username: 'davidperjac',
		// 			email: 'davidperjac@hotmail.com',
		// 			password: '123',
		// 		},
		// 	],
		// 	{}
		// );
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Users', null, {});
	},
};
