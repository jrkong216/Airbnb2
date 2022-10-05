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
      {
        spotId: 4,
        url: 'https://www.nps.gov/common/uploads/grid_builder/stli/crop16_9/7DBAB193-E4E7-80BE-262BCF6D65A24D88.jpg?width=465&quality=90&mode=crop',
        preview: true,
        //statue of liberty
      },
      {
        spotId: 5,
        url: 'https://static.wikia.nocookie.net/memoryalpha/images/0/00/USS_Enterprise-D%2C_TNG_Season_3-7.jpg/revision/latest?cb=20160203203647&path-prefix=en',
        preview: true,
        //sstar trek TNG
      },
      {
        spotId: 6,
        url: 'https://lumiere-a.akamaihd.net/v1/images/yodas-hut_a3d1133d.jpeg?region=0%2C75%2C1560%2C880&width=960',
        preview: true,
        //yoda hut
      },
      {
        spotId: 7,
        url: 'https://images.squarespace-cdn.com/content/v1/52d6d1ede4b0b322e9c7a2ea/1575268717767-TPMH7ZBKG0XVY0GO7BPM/1.png?format=1000w',
        preview: true,
        //neos place
      },
      {
        spotId: 8,
        url: 'https://theblackandwhite.net/wp-content/uploads/2021/03/Mulan-1-900x514.jpg',
        preview: true,
        //mulan place
      },
      {
        spotId: 9,
        url: 'https://static.wikia.nocookie.net/pixar/images/9/99/AndysNewHouse2.jpg/revision/latest?cb=20140324235559',
        preview: true,
        //andy house
      },
      {
        spotId: 10,
        url: 'https://static.wikia.nocookie.net/disney/images/4/40/Carl%27s_house_New.jpg/revision/latest?cb=20120721140601',
        preview: true,
        //up house
      },
      {
        spotId: 11,
        url: 'https://static.wikia.nocookie.net/gameofthrones/images/8/83/King%27s_Landing_HotD.png/revision/latest/scale-to-width-down/1200?cb=20220805155800',
        preview: true,
        //kings landing
      },
      {
        spotId: 12,
        url: 'https://wallpaperaccess.com/full/1307540.jpg',
        preview: true,
        //house stark
      },
      {
        spotId: 13,
        url: 'https://thumbs.dreamstime.com/b/exterior-view-oracle-arena-located-east-san-francisco-bay-area-oakland-ca-usa-multi-purpose-sports-concert-venue-125124121.jpg',
        preview: true,
        //oracle arena
      },
      {
        spotId: 14,
        url: 'https://img.msg.com/wp-content/uploads/2017/07/MSG21_MSG_Getting-There_v2.jpg?w=500',
        preview: true,
        //madinson square
      },
      {
        spotId: 15,
        url: 'https://talksport.com/wp-content/uploads/sites/5/2020/04/APEX3.jpeg?strip=all&quality=100&w=1200&h=800&crop=1',
        preview: true,
        //ufc aapex
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('SpotImages', null, {});

  }
};
