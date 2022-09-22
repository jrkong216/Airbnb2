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
      address: "123 Disney Lane",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "App Academy",
      description: "Place where web developers are created",
      price: 123,
      createdAt: "2021-11-19 20:39:36",
      updatedAt: "2021-11-19 20:39:36",
    },
    {
      ownerId: 2,
      address: "1234 Disney Lane",
      city: "San Jose",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "APP ACADEMY2",
      description: "Random are I have no idea 1",
      price: 123,
      createdAt: "2021-11-19 20:39:36",
      updatedAt: "2021-11-19 20:39:36",
    },
    {
      ownerId: 3,
      address: "1235 Disney Lane",
      city: "San Mateo",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "APP ACADEMY 3",
      description: "Random are I have no idea 2",
      price: 123,
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
