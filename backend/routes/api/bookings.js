const express = require('express');
const router = express.Router();

const { Spot, sequelize, Review, SpotImage, User, Booking, ReviewImage} = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth')
const { Op } = require("sequelize");


//* --------------------------Get all of the Current User's Bookings----------------------------- */

router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id
    let bookingsObj;
    let newArr = [];

    const allBooking = await Booking.findAll({
      where: {userId},
      include: [{ model: Spot,  attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price"] }]
    })

//     for (let spot of allBooking) {
//       const spotImage = await SpotImage.findOne({
//           attributes: ['url'],
//           where: {
//               preview: true,
//               spotId: spot.id
//           },
//           raw: true
//       })
//       // if true, then set the new keyvaluepair in that object.

//       if (spotImage) {
//           spot.previewImage = spotImage.url
//       } else {
//           spot.previewImage = null
//       }
//   }
//   res.status(200)
//   return res.json({Bookings: allBooking})
// })
    for (let i = 0; i< allBooking.length; i++){
      bookingsObj = allBooking[i].toJSON();
      const previewImage = await SpotImage.findByPk(allBooking[i].id, {
          where: { preview: true },
          attributes: ['url'],
          raw: true
      })

      if (previewImage){
        bookingsObj.Spot.previewImage = previewImage.url
        newArr.push(bookingsObj)
      } else {
        bookingsObj.Spot.previewImage = null
        newArr.push(bookingsObj)
      }

  }

    res.status(200)
    res.json({ Bookings: newArr })
  })
//* --------------------------Edit a Booking----------------------------- */

router.put('/:bookingId', async (req, res) =>{

    const {startDate,
            endDate
            } = req.body

        useableStartDate = new Date(startDate)
        // console.log("USEABLESTART DATE",useableStartDate)
        useableEndDate = new Date(endDate)
        // console.log("USEABLESTART END",useableStartDate)
    const bookingId = req.params.bookingId

    const editBooking = await Booking.findByPk(bookingId)

    if (!editBooking) {
        res.status(404)
        res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }
    // if THE START DATE is GREATER THAN THE END DATE
    // date.now and then parse that
    if (useableStartDate  > useableEndDate ) {
        res.status(400)
        res.json({
          message: "Your End Date cannot come before your Start Date",
          statusCode: 400,
          errors: {
            endDate: "endDate cannot come before startDate"
          }
        })
      }
      // error for trying to bookin in the past???
      // need how to get todays date and then end of booking date
      // userableStartDate covers both cases of the start and end date is "before" now
// let presentDate = new Date()
//     if ( presentDate > useableStartDate ) {
//         res.status(403)
//         res.json({
//             message: "Past bookings can't be modified",
//             statusCode: 403
//         })
//     }

    // booking conflict??? not working line 110-115 not doing as intended need to re-review

    // const currentBookings = await Booking.findAll({
    //   where: {spotId: editBooking.spotId},
    //   [Op.and]: [
    //     {useableStartDate: { [Op.gt]: useableEndDate } },
    //     { useableEndDate: { [Op.lt]: useableStartDate } },
    //   ],
    // })

    // if (currentBookings.length) {
    //   res.status(403)
    //   res.json({
    //     message: "Sorry, this spot is already booked for the specified dates",
    //     statusCode: 403,
    //     errors: {
    //       startDate: "Start date conflicts with an existing booking",
    //       endDate: "End date conflicts with an existing booking"
    //     }
    //   })
    // }

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
