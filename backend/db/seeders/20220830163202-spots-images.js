'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'https://whimsysoul.com/wp-content/uploads/2020/02/Whimsy-Soul-Dunder-Mifflin-The-Office-3.png',
        preview: true,
        //aa
      },
      {
        spotId: 2,
        url: 'http://blogs.smithsonianmag.com/design/files/2012/07/221_sh-museum.jpg',
        preview: true,
        //sherlock
      },
      {
        spotId: 3,
        url: 'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/ikkRKmrYDiv0/v0/1200x-1.jpg',
        preview: true,
        //golden
      },
      {
        spotId: 4,
        url: 'https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2021/09/1200/675/statue-of-liberty-1.jpg?ve=1&tl=1',
        preview: true,
        //statue of liberty
      },
      {
        spotId: 5,
        url: 'https://lumiere-a.akamaihd.net/v1/images/yodas-hut_a3d1133d.jpeg?region=0%2C75%2C1560%2C880&width=960',
        preview: true,
        //yoda hut
      },
      {
        spotId: 6,
        url: 'https://images.squarespace-cdn.com/content/v1/52d6d1ede4b0b322e9c7a2ea/1575268717767-TPMH7ZBKG0XVY0GO7BPM/1.png?format=1000w',
        preview: true,
        //neos place
      },
      {
        spotId: 7,
        url: 'https://theblackandwhite.net/wp-content/uploads/2021/03/Mulan-1-900x514.jpg',
        preview: true,
        //mulan place
      },
      {
        spotId: 8,
        url: 'https://cdn.agora.community/assets/1bdbe90f-1733-4878-ada9-d2090517fa32/room_01_1606454248581_1607100029915.jpg',
        preview: true,
        //andy house
      },
      {
        spotId: 9,
        url: 'https://cdn.dribbble.com/users/731780/screenshots/3889619/pixel_up_house_with_balloons-01.png',
        preview: true,
        //up house
      },
      {
        spotId: 10,
        url: 'https://awoiaf.westeros.org/images/6/64/Tomasz_Jedruszek_Kings_Landing.jpg',
        preview: true,
        //kings landing
      },
      {
        spotId: 11,
        url: 'https://wallpaperaccess.com/full/1307540.jpg',
        preview: true,
        //house stark
      },
      {
        spotId: 12,
        url: 'https://www.mercurynews.com/wp-content/uploads/2019/08/EBT-L-ORACLE-0809-2.jpg?w=1024',
        preview: true,
        //oracle arena
      },
      {
        spotId: 13,
        url: 'https://img.msg.com/wp-content/uploads/2017/07/MSG21_MSG_Getting-There_v2.jpg?w=500',
        preview: true,
        //madinson square
      },
      {
        spotId: 14,
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
