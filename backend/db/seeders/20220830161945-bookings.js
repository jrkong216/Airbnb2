'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Bookings', [
      {
        userId: 1,
        spotId: 1,
        startDate: new Date("2023-08-30"),
        endDate: new Date("2023-08-31")
      },
      {
        userId: 2,
        spotId: 2,
        startDate: new Date("2023-10-01"),
        endDate: new Date("2023-10-07")
      },
      {
        userId: 3,
        spotId: 3,
        startDate: new Date("2023-12-21"),
        endDate: new Date("2023-12-27"),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Bookings', null, {});
  }
};
