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
		// 	'Boards',
		// 	[
		// 		{
		// 			boardId: 1,
		// 			name: 'Code',
		// 			description: 'React,Angular,Vue',
		// 			userId: 1,
		// 		},
		// 	],
		// 	{}
		// );
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Boards', null, {});
	},
};
