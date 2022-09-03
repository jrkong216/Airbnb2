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
     await queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 1,
        review: "APP ACADEMY IS THE BEST! GREAT PEOPLE AND GREAT BLAH BLAH BLAH",
        stars: 5,
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-19 20:39:36",
      },
      {
        spotId: 2,
        userId: 2,
        review: "RANDOM PLACE 1 IS WHATEVER!! WHY DID I COME HERE!?",
        stars: 3,
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-19 20:39:36",
      },
      {
        spotId: 3,
        userId: 3,
        review: "RANDOM PLACE 2 IS UNCLEAN! 1 STAR!!!!",
        stars: 1,
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-19 20:39:36",
      },
      // {
      //   spotId: 1,
      //   userId: 2,
      //   review: "APP ACADEMY IS THE WORST average stars should be 3",
      //   stars: 1,
      //   createdAt: "2021-11-19 20:39:36",
      //   updatedAt: "2021-11-19 20:39:36",
      // },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Reviews', null, {});
  }
};
