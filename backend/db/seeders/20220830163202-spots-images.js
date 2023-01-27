'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'https://marketingtechstack.com/wp-content/uploads/2022/01/dunder-mifflin-featured-image.png',
        preview: true,
        //aa
      },
      {
        spotId: 2,
        url: 'https://planetofhotels.com/guide/sites/default/files/styles/paragraph__hero_banner__hb_image__1880bp/public/hero_banner/sherlock-holmes.jpg',
        preview: true,
        //sherlock
      },
      {
        spotId: 3,
        url: 'https://a.cdn-hotels.com/gdcs/production125/d1171/965955d8-0449-40c4-bdbf-7327d49f4014.jpg',
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
        url: 'https://helios-i.mashable.com/imagery/articles/014Cet8MZE0yNOdENkeCOL9/hero-image.fill.size_1248x702.v1611614996.png',
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
        url: 'https://static1.srcdn.com/wordpress/wp-content/uploads/2022/09/Up-Carl-Balloons-house.jpg',
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
        url: 'https://watchersonthewall.com/wp-content/uploads/2017/11/Winterfell-white-raven.jpg',
        preview: true,
        //house stark
      },
      {
        spotId: 12,
        url: 'https://cdn.abcotvs.com/dip/images/5238298_040819-kgo-oracle-arena-exterior-img.jpg?w=1600',
        preview: true,
        //oracle arena
      },
      {
        spotId: 13,
        url: 'https://www.newyorkbyrail.com/wp-content/uploads/2018/10/MSG-Madison-Square-Garden.png',
        preview: true,
        //madinson square
      },
      {
        spotId: 14,
        url: 'https://www.sportsvideo.org/wp-content/uploads/2019/06/UFC-APEX-4.jpg',
        preview: true,
        //ufc aapex
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('SpotImages', null, {});

  }
};
