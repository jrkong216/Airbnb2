const express = require('express');
const router = express.Router();

const { Spot, sequelize, Review, SpotImage, User, Booking, ReviewImage} = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth')

// //          GET ALL SPOTS with averageRting and previewImage THIS WILL BE TAKEN OVER BY PAGINATION ENTRY
// router.get('/', async (req, res) => {

// const allSpots = await Spot.findAll({
//     include:
//         {
//             model: Review, attributes: []
//         },
//     attributes:{
//         include: [[
//             sequelize.fn('ROUND',sequelize.fn("AVG", sequelize.col("stars")),2), "avgRating"
//         ]]
//     },

//     group: ['Spot.id'], // THIS IS TO RETURN ALL THE SPOTS, and not just One
//     raw: true // sequelize says set this tot true if you dont have a model definition in your query
// })
// // go through each Spot and see if they have an associated image
// for (let spot of allSpots) {
//     const spotImage = await SpotImage.findOne({
//         attributes: ['url'],
//         where: {
//             preview: true,
//             spotId: spot.id
//         },
//         raw: true
//     })
//     // if true, then set the new keyvaluepair in that object.

//     if (spotImage) {
//         spot.previewImage = spotImage.url
//     } else {
//         spot.previewImage = null
//     }
// }
// res.status(200)
// return res.json({Spots: allSpots})
// })

//* -----------------------------Get all spots for the current owner----------------------------- */

router.get('/current', requireAuth, async (req, res) => {
 const userId = req.user.id

    const allSpots = await Spot.findAll({
        where:{ownerId: userId},
        include:
            {model: Review, attributes: []},
        attributes:{
            include: [[
                sequelize.fn("AVG", sequelize.col("stars")), "avgRating"
            ]]
        },
        group: ['Spot.id'], // THIS IS TO RETURN ALL THE SPOTS, and not just One
        raw: true // sequelize says set this to true if you dont have a model definition in your query.
    })
    // go through each Spot and see if they have an associated image
    for (let spot of allSpots) {
        const spotImage = await SpotImage.findOne({
            attributes: ['url'],
            where: {
                preview: true,
                spotId: spot.id
            },
            raw: true
        })
        // if true, then set the new keyvaluepair in that object.

        if (spotImage) {
            spot.previewImage = spotImage.url
        } else {
            spot.previewImage = null
        }
    }
    // console.log(allSpots)
    res.status(200)
    return res.json({Spots: allSpots})
    })

//* -----------------------------Get details of a Spot from an id----------------------------- */

router.get('/:spotId', async(req, res, next) => {
    const spotId = req.params.spotId

    const spotInfo = await Spot.findByPk(spotId)

    if (!spotInfo){
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    const owner = await User.findByPk(spotInfo.ownerId, {
        attributes: ['id', 'firstName', 'lastName']
    })
    const numReviews = await Review.count( {
        where: {spotId: spotId},
        raw: true
    })
    const SpotImages = await SpotImage.findAll({
        attributes: ['id','url','preview'],
        where: {spotId: spotId}
    })
    const averageRating = await Review.findOne({
        attributes: [[sequelize.fn('ROUND',sequelize.fn("AVG", sequelize.col("stars")),2), "avgStarRating"]],
        where: {spotId: spotId},
        raw: true
    })

const details = spotInfo.toJSON()

details.numReviews = numReviews
details.avgStarRating = averageRating.avgStarRating
details.SpotImages  = SpotImages
details.Owner = owner

return res.json(details)

})

//* -----------------------------Create a Spot----------------------------- */

router.post('/', requireAuth, async (req, res) => {
    const { address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price } = req.body

    let userId = req.user.id

    const newSpot = await Spot.create({
        ownerId: userId,
        address: address,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lng: lng,
        name: name,
        description: description,
        price: price
    })

if (newSpot) {
        res.status(200)
        return res.json(newSpot)
    } else {
            res.status(400)
            return res.json({
                message: 'Validation Error',
                statusCode: 400,
                errors: {
                    address: "Street address is required",
                    city: "City is required",
                    state: "State is required",
                    country: "Country is required",
                    lat: "Latitude is not valid",
                    lng: "Longitude is not valid",
                    name: "Name must be less than 50 characters",
                    description: "Description is required",
                    price: "Price per day is required"
            }
        })
    }
})

//* --------------------------Add an Image to a Spot based on the Spot's id----------------------------- */

router.post('/:spotId/images', requireAuth, async(req, res)=>{
    const spotId = req.params.spotId
    const { url,
            preview,
            } = req.body

    const findSpot = await Spot.findByPk(spotId)
            if (!findSpot){
                res.status(404)
                return res.json({
                    "message": "Spot couldn't be found",
                    "statusCode": 404,
                })
            }

const image = await SpotImage.create({
    spotId: parseInt(req.params.spotId),
    url,
    preview
})

const object = {}

object.id = image.id
object.url = image.url
object.preview = image.preview


res.status = 200
return res.json(object)

})


//* --------------------------Edit a Spot----------------------------- */
router.put('/:spotId', async (req, res) =>{

    const {address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price} = req.body

    const spotId = req.params.spotId

    const editSpot = await Spot.findByPk(spotId)

    if (!editSpot) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    if (editSpot) {
        res.status(200)
        editSpot.set({ address, city, state, country, lat, lng, name, description, price });

        await editSpot.save()

        res.status(200)
        return res.json(editSpot)
    }
     else {
            res.status(400)
            return res.json({
                message: 'Validation Error',
                statusCode: 400,
                errors: {
                    address: "Street address is required",
                    city: "City is required",
                    state: "State is required",
                    country: "Country is required",
                    lat: "Latitude is not valid",
                    lng: "Longitude is not valid",
                    name: "Name must be less than 50 characters",
                    description: "Description is required",
                    price: "Price per day is required"
            }
        })
    }
})

//* --------------------------Get all Reviews by a Spot's id----------------------------- */
router.get('/:spotId/reviews', async (req, res) => {
    let { spotId } = req.params
    const findSpot = await Spot.findByPk(spotId)

    const allReviews = await Review.findAll({
        where: { spotId },
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            { model: ReviewImage, attributes: ['id', 'url'] }
        ]
    })

    // Error response: Couldn't find a Spot with the specified id
    if (!findSpot) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404,
        })
    }

    // Successful Response
    if (findSpot) {
        res.status(200)
        res.json({ Reviews: allReviews })
    }

})
//* --------------------------Create a Review for a Spot based on the Spot's id----------------------------- */
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const { review, stars } = req.body;

    // const { spotId } = req.params
    let spotId = parseInt(req.params.spotId)
    const findSpot = await Spot.findByPk(spotId)
    // console.log("!!!!!BNAAN", req)
    const { user } = req
    const userId = user.id

    // find all reviews for a Spot
    const allReviews = await Review.findAll({
        include: [
            { model: Spot, where: { id: spotId } }
        ]
    })

    if (findSpot) {
        // check if a review for a spot has already been made by userId
        let reviewed;
        for (let review of allReviews) {
            if (review.userId === userId) {
                reviewed = true
            }
        }
        if (reviewed) {
            // Error response: Review from the current user already exists for the Spot
            res.status(403)
            res.json({
                message: "User already has a review for this spot",
                statusCode: 403
            })
        } else if (stars < 1 || stars > 5) {
            //* Error Response: Body validation errors
            res.status(400)
            res.json({
                message: "Validation error",
                statusCode: 400,
                errors: {
                    review: "Review text is required",
                    stars: "Stars must be an integer from 1 to 5",
                }
            })
        } else {
            // Create review
            const spotReview = await Review.create({
                userId, spotId, review, stars
            })
            if(spotReview){
                res.status(200)
                return res.json(spotReview)
            }
            // Successful Response
            // res.status(200)
            // return res.json(spotReview)
            else {
                res.status(400)
                return res.json({
                    message: "Validation error",
                    statusCode: 400,
                    errors: {
                        review: "reviews required or can be empty",
                        stars: "star can be empty"
                    }
                })
            }
        }
    } else {
        //* Error response: Couldn't find a Spot with the specified id
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
})
//* --------------------------Get all Bookings for a Spot based on the Spots Id----------------------------- */
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    let { spotId } = req.params

    const findSpot = await Spot.findByPk(spotId)

    // console.log("this is findspot", findSpot)

    const allBookings = await Booking.findAll({
        where: {spotId},
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
        ]
    })

    if (!findSpot) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404,
        })
    }

// Successful Response
if (findSpot) {
    res.status(200)
    res.json({ Bookings: allBookings })
}
})

//* --------------------------Get all Bookings for a spot by Id----------------------------- */
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    let { spotId } = req.params
    const findSpot = await Spot.findByPk(spotId)

    const currentUserId = req.user.id

    const owner = await Spot.findOne({
        where: { ownerId: currentUserId }
    })

    const allBookings = await Booking.findAll({
        where: { spotId },
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
        ]
    })

    if (!findSpot) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404,
        })
    }

    if (findSpot) {

        if (owner.id === currentUserId) {
            res.status(200)
            res.json({ allBookings })
        } else {

            const allBookings = await Booking.findAll({
                where: { spotId },
                attributes: ['spotId', 'startDate', 'endDate']
            })

            res.status(200)
            res.json({ Bookings: allBookings })
        }
    }
})

//* --------------------------Create a Booking for a Spot based on the Spot Id----------------------------- */

router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body

    const { spotId } = req.params
    const findSpot = await Spot.findByPk(spotId)

    const { user } = req
    const userId = user.dataValues.id

    const allBookings = await Booking.findAll({
        include: [
            { model: Spot, where: { id: spotId } }
        ]
    })
    console.log("this is allBookings", allBookings)

    let providedStartDate = Date.parse(startDate)
    let providedEndDate = Date.parse(endDate)

    if (findSpot) {
        //  check if a booking for a spot has already been made by userId


        for(let i = 0; i<allBookings.length; i++){
            if(providedStartDate >=Date.parse(allBookings[i].startDate) && providedStartDate<=Date.parse(allBookings[i].endDate)){
            res.status(403)
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })}
        else if(providedEndDate >=Date.parse(allBookings[i].startDate) && providedEndDate <=Date.parse(allBookings[i].endDate)){
            res.status(403)
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })}
        else if(providedStartDate <=Date.parse(allBookings[i].startDate) && providedEndDate>=Date.parse(allBookings[i].endDate)){
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
        else if (providedEndDate === providedStartDate) {
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

            const spotBooking = await Booking.create({
                spotId: parseInt(req.params.spotId),
                userId,
                startDate,
                endDate
            })
            // Successful Response
            res.status(200)
            res.json(spotBooking)
        }
    } else {
        //* Error response: Couldn't find a Spot with the specified id
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
})



//* --------------------------GET SPOTS PAGINATION QUERY----------------------------- */

router.get('/', async (req, res) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query

    let where = {};

    if (minLat) {
        where.minLat = minLat
    }
    // ADD ELSE IF STATEMENTS IF THE MINLAT AND REST ARE INVALID
    if (maxLat) {
        where.maxLat = maxLat
    }
    if (minLng) {
        where.minLng = minLng
    }
    if (maxLng) {
        where.maxLng = maxLng
    }
    if (minPrice) {
        where.minPrice = minPrice
    }
    if (maxPrice) {
        where.maxPrice = maxPrice
    }

    page = parseInt(page);
    size = parseInt(size);

    if (Number.isNaN(page) || !page) page = 1;
    if (Number.isNaN(size) || !size) size = 20;

    if ((page < 1 || page > 10) || (size < 1 || size > 20)) {
        res.status(400)
        res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                page: "Page must be greater than or equal to 1",
                size: "Size must be greater than or equal to 1"
            }
        })
    }

    // Return data for GET all Spots if there is a pagination
    if (req.query.page && req.query.size) {

        const allSpots = await Spot.findAll({
            where: { ...where },

            // pagination
            limit: size,
            offset: size * (page - 1),

            group: ['Spot.id'],
            raw: true,
        })

        for (let spot of allSpots) {
            const spotImage = await SpotImage.findOne({
                attributes: ['url'],
                where: {
                    preview: true,
                    spotId: spot.id
                },
                raw: true
            })
            // if true, then set the new keyvaluepair in that object.

            if (spotImage) {
                spot.previewImage = spotImage.url
            } else {
                spot.previewImage = null
            }
        }
        // Successful Response
        res.status(200)
        res.json({ Spots: allSpots, page, size });

    } else {
        // Return data for GET all Spots if there is  NO pagination

        // Get spot all
        const allSpots = await Spot.findAll({
            attributes: {
                include: [
                    [sequelize.fn('ROUND',sequelize.fn("AVG", sequelize.col("stars")),2), "avgRating"]  //AvgRating Column Added using sequelize functions in the stars column
                ]
            },

            include: [
                { model: Review, attributes: [] }  //Provide access to Review model from associations
            ],

            group: ['Spot.id'],   // needed in order to return all spots
            raw: true

        })

        // Associate previewImage with Spots
        // Iterate through each spot in allSpots variable
        for (let spot of allSpots) {
            const spotImage = await SpotImage.findOne({
                attributes: ['url'],
                where: {
                    preview: true,
                    spotId: spot.id
                },
                raw: true
            })

            //Determine if image contains a url link
            // if image exists, set the url of the image equal to the value of previewImage
            if (spotImage) {
                spot.previewImage = spotImage.url
            } else {
                spot.previewImage = null
            }
        }

        // Successful Response
        res.status(200)
        res.json({ Spots: allSpots })
    }
})




//* --------------------------Delete a Spot----------------------------- */
router.delete('/:spotId', async(req, res) => {

    const spotId = req.params.spotId
    const currentSpot = await Spot.findByPk(spotId)

    if(!currentSpot){
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    await currentSpot.destroy()

    res.status(200)
    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})


module.exports = router;
