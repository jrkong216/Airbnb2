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
  const { startDate, endDate } = req.body

    const { bookingId } = req.params
    const findBooking = await Booking.findByPk(bookingId)

    const { user } = req
    const userId = user.dataValues.id

    let providedStartDate = Date.parse(startDate)
    let providedEndDate = Date.parse(endDate)

    const bookedDates = await Booking.findAll({
      attributes: ["startDate", "endDate"], raw: true, nest: true,
      where: {
        id:{
          [Op.not]: findBooking.id
        }
      }
    })

    if (findBooking) {
      // console.log("This is findBooking", findBooking)
        //  check if a booking for a spot has already been made by userId


        for(let i = 0; i<bookedDates.length; i++){

          if (providedEndDate < providedStartDate) {
            //* Error response: Booking already exists for the Spot
            res.status(400)
            res.json({
                message: "Sorry, End Date cannot be before Start Date",
                statusCode: 400,
                errors: {
                    "endDate": "endDate cannot be on or before startDate"
                }
            })
        }

            if(providedStartDate >=Date.parse(bookedDates[i].startDate) && providedStartDate<=Date.parse(bookedDates[i].endDate)){
            res.status(403)
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })}
        else if(providedEndDate >=Date.parse(bookedDates[i].startDate) && providedEndDate <=Date.parse(bookedDates[i].endDate)){
            res.status(403)
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })}
        else if(providedStartDate <=Date.parse(bookedDates[i].startDate) && providedEndDate>=Date.parse(bookedDates[i].endDate)){
            res.status(403)
            res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })}
          }


        if (providedEndDate === providedStartDate) {
            //* Error response: Booking already exists for the Spot
            res.status(400)
            res.json({
                message: "Sorry, You must stay at least 1 night",
                statusCode: 400,
                errors: {
                    "sameDate": "startDate and endDate cannot equal"
                }
            })

        }

        else {

          const updatedBooking = await Booking.findByPk(bookingId)
          console.log("this is updatedBooking", updatedBooking)

    await updatedBooking.update({ startDate: startDate, endDate: endDate })
    res.status(200)
    res.json({
      id: updatedBooking.id,
      userId: updatedBooking.userId,
      spotId: updatedBooking.spotId,
      startDate: updatedBooking.startDate,
      endDate: updatedBooking.endDate,
      createdAt: updatedBooking.createdAt,
      updatedAt: updatedBooking.updatedAt
    })
        }
    } else {
        //* Error response: Couldn't find a Spot with the specified id
        res.status(404)
        res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
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
