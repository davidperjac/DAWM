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
		// 			boardId: '190f55a6-76d5-48fb-a0b7-d03a4f04aa99',
		// 			name: 'Marketing',
		// 			description: 'Spa World',
		// 			userId: '03e27937-d6b8-49b6-a11b-b6a6c9c7bcdf',
		// 		},
		// 	],
		// 	{}
		// );
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Boards', null, {});
	},
};
