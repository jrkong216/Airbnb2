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
        url: 'https://thirdeyetraveller.com/wp-content/uploads/221b-Baker-Street-London-Sherlock-Holmes-Museum-2.jpg',
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
        url: 'https://i.pinimg.com/originals/6b/25/61/6b256149e8a97741883856c31c9cd4ea.png',
        preview: true,
        //yoda hut
      },
      {
        spotId: 6,
        url: 'https://pbs.twimg.com/media/FHPo31TXEAA10cY.jpg:large',
        preview: true,
        //neos place
      },
      {
        spotId: 7,
        url: 'https://pbs.twimg.com/media/EYyr81gXYAAM9UJ.jpg',
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
        url: 'https://cdn.apartmenttherapy.info/image/upload/v1564776737/stock/MCDUPUP_EC041_1.jpg',
        preview: true,
        //up house
      },
      {
        spotId: 10,
        url: 'https://assets.vogue.com/photos/598dacb5f0b0e21484d342ba/master/w_2560%2Cc_limit/00-lede-a-game-of-thrones-guide-to-dubrovnik-croatia.jpg',
        preview: true,
        //kings landing
      },
      {
        spotId: 11,
        url: 'https://cdn.vox-cdn.com/thumbor/7xduHxUGDbvuFRqIyENvDkU8Xek=/0x0:5000x3333/1200x800/filters:focal(2193x789:2993x1589)/cdn.vox-cdn.com/uploads/chorus_image/image/63571452/winterfell.0.jpg',
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
        url: 'https://img.msg.com/wp-content/uploads/2021/02/BillyJoel_071818_1902_RT-1.jpg',
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
