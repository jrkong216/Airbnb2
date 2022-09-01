const express = require('express');
const router = express.Router();

const { Spot, sequelize, Review, SpotImage, User, Booking, ReviewImage} = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth')


//* --------------------------Get all of the Current User's Bookings----------------------------- */

router.get('/current', requireAuth, async (req, res) => {
    const userIdReq = req.user.id

    const allBooking = await Booking.findAll({
    //   where: {userId: userIdReq},
      include: [{ model: Spot,  attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price"] }]
    })

    console.log(allBooking)

    res.status(200)
    res.json({ allBooking })
  })


module.exports = router;


//* --------------------------Edit a Booking----------------------------- */
