'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'https://whimsysoul.com/wp-content/uploads/2020/02/Whimsy-Soul-Dunder-Mifflin-The-Office-3.png',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://previews.123rf.com/images/konstantin32/konstantin321210/konstantin32121002706/15837501-london-jun-6-sherlok-holmes-museum-in-baker-street-221b-is-a-most-populous-place-in-london-june-6-20.jpg',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/ikkRKmrYDiv0/v0/1200x-1.jpg',
        preview: true,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('SpotImages', null, {});

  }
};
