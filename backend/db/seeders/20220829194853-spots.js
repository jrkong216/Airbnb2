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
   await queryInterface.bulkInsert('Spots', [
    {
      ownerId: 1,
      address: "123 App Academy Lane",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "App Academy",
      description: "Place where web developers are created",
      price: 30000,
      createdAt: "2021-11-19 20:39:36",
      updatedAt: "2021-11-19 20:39:36",
    },
    {
      ownerId: 2,
      address: "221B Baker Street",
      city: "London",
      state: "England",
      country: "UK",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Shelock Holmes Hood",
      description: "Elementary my dear Watson",
      price: 255,
      createdAt: "2021-11-19 20:39:36",
      updatedAt: "2021-11-19 20:39:36",
    },
    {
      ownerId: 3,
      address: "13579 Texas Ave",
      city: "San Antonio",
      state: "Texas",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "FlapJaxk City",
      description: "Everything is bigger in Texas!",
      price: 999,
      createdAt: "2021-11-19 20:39:36",
      updatedAt: "2021-11-19 20:39:36",
    }
  ], {});
},

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Spots', null, {});
  }
};
