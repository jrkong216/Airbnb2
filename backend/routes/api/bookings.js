const express = require('express');
const router = express.Router();

const { Spot, sequelize, Review, SpotImage, User, Booking, ReviewImage} = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth')
const { Op } = require("sequelize");


//* --------------------------Get all of the Current User's Bookings----------------------------- */

router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id

    const allBooking = await Booking.findAll({
      where: {userId},
      include: [{ model: Spot,  attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price"] }]
    })

    console.log(allBooking)

    res.status(200)
    res.json({ allBooking })
  })
//* --------------------------Edit a Booking----------------------------- */

router.put('/:bookingId', async (req, res) =>{

    const {startDate,
            endDate
            } = req.body

    const bookingId = req.params.bookingId

    const editBooking = await Spot.findByPk(bookingId)

    if (!editBooking) {
        res.status(404)
        res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }
    // error for start date after end date
    if (startDate > endDate) {
        res.status(400)
        res.json({
          message: "Validation error",
          statusCode: 400,
          errors: {
            endDate: "endDate cannot come before startDate"
          }
        })
      }
      // todays date is greater than the start date (ie cant book in past)
        let now = Date.now()
        let bookingDate = new Date(editBooking.endDate)

    if (now > bookingDate) {
        res.status(403)
        res.json({
            message: "Past bookings can't be modified",
            statusCode: 403
        })
    }
    // booking conflict
    const spotId = editBooking.spotId

    const currentBookings = await Booking.findAll({
      where: {
        spotId: spotId,
        [Op.and]: [
          { endDate: { [Op.gte]: startDate } },
          { startDate: { [Op.lte]: endDate } },
        ],
      },
    });

    if (currentBookings.length) {
        res.status(403)
        res.json({
          message: "Sorry, this spot is already booked for the specified dates",
          statusCode: 403,
          errors: {
            startDate: "Start date conflicts with an existing booking",
            endDate: "End date conflicts with an existing booking"
          }
        })
      }

// do i need to ensure that the editBooking.userId matches the req.user.id as well?
          if (editBooking.userId === req.user.id) {
              editBooking.startDate = startDate,
              editBooking.endDate = endDate,

              await editBooking.save()

  // Successful Response
  res.status(200)
  res.json(editBooking)
}

})

//* --------------------------Delete a Booking----------------------------- */

router.delete("/:bookingId", requireAuth, restoreUser, async (req, res) => {
    const { bookingId } = req.params;
    const findBooking = await Booking.findByPk(bookingId);

    // Error response: Bookings that have been started can't be deleted
    let now = Date.now()
    let bookingDate = new Date(bookingId.startDate)

    if (now > bookingDate) {
      res.json({
        message: "Bookings that have been started can't be deleted",
        statusCode: 403
      })
    }

    // Error response: Couldn't find a Booking with the specified id
    if (!findBooking) {
      res.status(404);
      res.json({
        message: "Booking couldn't be found",
        statusCode: 404,
      });
    }

    // Delete booking
    await findBooking.destroy();

    // Successful Response
    res.status(200)
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });

  });

module.exports = router;
