'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

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

     await queryInterface.bulkDelete('SpotImages', null, {});

  }
};
