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
        review: "Slepted Overnight, got a 24-week Bootcamp intensive. Best sleep I ever had afterwards. 5 Stars!",
        stars: 5,
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-19 20:39:36",
      },
      {
        spotId: 2,
        userId: 2,
        review: "The place was a little dusty, but sometimes I couldn't tell if it was dust or possibily cocaine",
        stars: 3,
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-19 20:39:36",
      },
      {
        spotId: 3,
        userId: 3,
        review: "Great Bridge and Great People!!!",
        stars: 5,
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-19 20:39:36",
      },
      {
        spotId: 4,
        userId: 1,
        review: "Lady Liberty never looked better!",
        stars: 5,
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-19 20:39:36",
      },
      {
        spotId: 5,
        userId: 2,
        review: "Got lucky and got to see THEEEE Luke Skywalker training. You dont see that everyday.",
        stars: 4,
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-19 20:39:36",
      },
      {
        spotId: 6,
        userId: 3,
        review: "Wouldn't tell anybody else to stay here... kept being ask if I wanted the red or blue pill...",
        stars: 1,
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-19 20:39:36",
      },
      {
        spotId: 7,
        userId: 1,
        review: "The family atmosphere is great. I didn't see a dragon though. I thought I heard Eddie Murphy though..",
        stars: 5,
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-19 20:39:36",
      },
      // {
      //   spotId: 8,
      //   userId: 2,
      //   review: "The family atmosphere is great. I didn't see a dragon though. I thought I heard Eddie Murphy though..",
      //   stars: 5,
      //   createdAt: "2021-11-19 20:39:36",
      //   updatedAt: "2021-11-19 20:39:36",
      // },
      {
        spotId: 9,
        userId: 3,
        review: "So many Balloons! Thaankfully the house didnt move when I stayed there",
        stars: 4,
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-19 20:39:36",
      },
      {
        spotId: 10,
        userId: 1,
        review: "To many brothels if you ask me!",
        stars: 1,
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-19 20:39:36",
      },
      // {
      //   spotId: 11,
      //   userId: 2,
      //   review: "To many brothels if you ask me!",
      //   stars: 1,
      //   createdAt: "2021-11-19 20:39:36",
      //   updatedAt: "2021-11-19 20:39:36",
      // },
      {
        spotId: 12,
        userId: 3,
        review: "The warriors are on FIRE!",
        stars: 5,
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-19 20:39:36",
      },
      {
        spotId: 13,
        userId: 1,
        review: "This place is DYNAMIITE!",
        stars: 5,
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-19 20:39:36",
      },
      {
        spotId: 14,
        userId: 2,
        review: "I was supposed to stay at this place, but apparently Mark Zuckerburg rented the whole place",
        stars: 1,
        createdAt: "2021-11-19 20:39:36",
        updatedAt: "2021-11-19 20:39:36",
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
     await queryInterface.bulkDelete('Reviews', null, {});
  }
};
