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
      lat: 37.787650,
      lng: -122.406310,
      name: "App Academy",
      description: "This is not Dunder Mifflin",
      price: 300,
      createdAt: "2021-11-19 20:39:36",
      updatedAt: "2021-11-19 20:39:36",
    },
    {
      ownerId: 2,
      address: "221B Baker Street",
      city: "London",
      state: "England",
      country: "UK",
      lat: 51.523160,
      lng: -0.158070,
      name: "Shelock Holmes Hood",
      description: "Elementary my dear Watson",
      price: 88,
      createdAt: "2021-11-19 20:39:36",
      updatedAt: "2021-11-19 20:39:36",
    },
    {
      ownerId: 3,
      address: "Golden Gate Bridge",
      city: "San Francisco",
      state: "CA",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Golden Gate Bridge",
      description: "The Golden Gate Bridge is a suspension bridge spanning the Golden Gate, the one-mile-wide strait connecting San Francisco Bay and the Pacific Ocean.",
      price: 96,
      createdAt: "2021-11-19 20:39:36",
      updatedAt: "2021-11-19 20:39:36",
    },
    {
      ownerId: 1,
      address: "New York",
      city: "New York",
      state: "NY",
      country: "United States of America",
      lat: 40.691635203376,
      lng:  -74.0432090947984,
      name: "Statue of Liberty",
      description: "The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York Harbor in New York City, in the United States.",
      price: 88,
      createdAt: "2021-11-19 20:39:36",
      updatedAt: "2021-11-19 20:39:36",
    },
    {
      ownerId: 2,
      address: "Yoda's Hut in Dagobah",
      city: "Dagobah",
      state: "DB",
      country: "Dagobah",
      lat: 33.815395,
      lng: -117.926399,
      name: "Yoda's Hut in Dagobah",
      description: "Yoda's Hut was the last residence of Yoda, Grand Master of the Jedi Order, during his years of self-imposed exile on Dagobah.",
      price: 1,
      createdAt: "2021-11-19 20:39:36",
      updatedAt: "2021-11-19 20:39:36",
    },
    {
      ownerId: 3,
      address: "123 The Matrix Street",
      city: "San Francisco",
      state: "CA",
      country: "United States of America",
      lat: 37.348099,
      lng: -113.089996,
      name: "Neo's Apartment",
      description: "To many computers and not enough space. Blue or Red Pill?",
      price: 1337,
      createdAt: "2021-11-19 20:39:36",
      updatedAt: "2021-11-19 20:39:36",
    },
    {
      ownerId: 1,
      address: "987 Mulan Road",
      city: "Nothern Wei",
      state: "CY",
      country: "China",
      lat: 40.432079176607,
      lng: 116.57035344016782,
      name: "Mulan's Place",
      description: "A tranquil place where you just might meet a fiery red dragon",
      price: 88,
      createdAt: "2021-11-19 20:39:36",
      updatedAt: "2021-11-19 20:39:36",
    },
    {
      ownerId: 2,
      address: "456 Toy Story Lane",
      city: "Chicago",
      state: "IL",
      country: "United States of America",
      lat: 37.83285500967301,
      lng: -122.28374477661919,
      name: "Andy's House",
      description: "Sometimes I feel like the toys move on their own.",
      price: 65,
      createdAt: "2021-11-19 20:39:36",
      updatedAt: "2021-11-19 20:39:36",
    },
    {
      ownerId: 3,
      address: "721 Balloon Way",
      city: "Boston",
      state: "MA",
      country: "United States of America",
      lat: 40.512090029201325,
      lng: -112.01942700215797,
      name: "Carl's House",
      description: "Location may change due to baloons.",
      price: 99,
      createdAt: "2021-11-19 20:39:36",
      updatedAt: "2021-11-19 20:39:36",
    },
    {
      ownerId: 1,
      address: "8181 Kings Landing Way",
      city: "Dubrovnik",
      state: "AD",
      country: "Croatia",
      lat: 42.6505,
      lng: 18.0878,
      name: "King's Landing",
      description: "In fact, its capital, King's Landing, is almost entirely filmed in the very real—and very beautiful—city of Dubrovnik, Croatia.",
      price: 156,
      createdAt: "2021-11-19 20:39:36",
      updatedAt: "2021-11-19 20:39:36",
    },
    {
      ownerId: 2,
      address: "999 Up North Street",
      city: "Winterfell",
      state: "GOT",
      country: "Seven Kingdoms",
      lat: 54.7736,
      lng: -7.01672,
      name: "House Stark",
      description: "Sean Bean always dies =/",
      price: 33,
      createdAt: "2021-11-19 20:39:36",
      updatedAt: "2021-11-19 20:39:36",
    },
    {
      ownerId: 3,
      address: "7000 S Coliseum Way",
      city: "Oakland",
      state: "CA",
      country: "United States of America",
      lat: 37.7499052269582,
      lng: -122.20391650224245,
      name: "Oracle Arena: Home of the Warriors",
      description: "We gonna win another championship!",
      price: 96,
      createdAt: "2021-11-19 20:39:36",
      updatedAt: "2021-11-19 20:39:36",
    },
    {
      ownerId: 1,
      address: "4 Pennsylvania Plaza",
      city: "New York",
      state: "NY",
      country: "United States of America",
      lat: 40.75088298858172,
      lng: -73.99377295982211,
      name: "Madison Square Garden",
      description: "Madison Square Garden, colloquially known as The Garden or by its initials MSG, is a multi-purpose indoor arena in New York City. It is located in Midtown Manhattan between Seventh and Eighth avenues from 31st to 33rd Street, above Pennsylvania Station.",
      price: 257,
      createdAt: "2021-11-19 20:39:36",
      updatedAt: "2021-11-19 20:39:36",
    },
    {
      ownerId: 2,
      address: "6650 El Camino Rd",
      city: "Las Vegas",
      state: "NV",
      country: "United States of America",
      lat: 36.068622197596376,
      lng: -115.22801810229137,
      name: "UFC APEX",
      description: "Only Mark Zuckerberg can rent out the Apex.",
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
