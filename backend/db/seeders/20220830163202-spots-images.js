'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c21hbGwlMjBzaXplfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://images.unsplash.com/photo-1520190282873-afe1285c9a2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c21hbGwlMjBzaXplfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://images.unsplash.com/photo-1473711789055-df5beb0e35ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c21hbGwlMjBzaXplfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        preview: true,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('SpotImages', null, {});

  }
};
