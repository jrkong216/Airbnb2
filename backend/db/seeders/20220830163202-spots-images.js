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
     await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'https://RANDOMSTRINGTOIMAGE1.com',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://RANDOMSTRINGTOIMAGE2.com',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://RANDOMSTRINGTOIMAGE3.com',
        preview: true,
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
     await queryInterface.bulkDelete('SpotImages', null, {});

  }
};
