const express = require('express');
const router = express.Router();

const { Spot, sequelize, Review, SpotImage, User, Booking, ReviewImage} = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth')

//          GET ALL SPOTS with averageRting and previewImage
router.get('/', async (req, res) => {

const allSpots = await Spot.findAll({
    include:
        {
            model: Review, attributes: []
        },
    attributes:{
        include: [[
            sequelize.fn("AVG", sequelize.col("stars")), "avgRating"
        ]]
    },

    group: ['Spot.id'], // THIS IS TO RETURN ALL THE SPOTS, and not just One
    raw: true // sequelize says set this tot true if you dont have a model definition in your query
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
res.status(200)
return res.json({Spots: allSpots})
})

//Get All Spots For the current User

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
        raw: true // sequelize says set this tot true if you dont have a model definition in your query
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
    res.status(200)
    return res.json({Spots: allSpots})
    })

//* -----------------------------Get details of a Spot from an id----------------------------- */

router.get('/:spotId', async(req, res, next) => {
    const spotId = req.params.spotId

    const spotInfo = await Spot.findByPk(spotId)

    if (!spotInfo){
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
        attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"]],
        where: {spotId: spotId},
        raw: true
    })

const details = spotInfo.toJSON()

details.numReviews = numReviews
details.avgStarRating = averageRating.avgStarRating
details.SpotImages  = SpotImages
details.owner = owner

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
    url,
    preview,
    spotId
})

image.url = url
image.preview = preview
image.spotId = spotId

res.status = 200
return res.json({image})

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
            { model: User, attributes: ['id', 'firstname', 'lastname'] },
            { model: ReviewImage }
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
        res.json({ allReviews })
    }

})
//* --------------------------Create a Review for a Spot based on the Spot's id----------------------------- */
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const { review, stars } = req.body;

    const { spotId } = req.params
    const findSpot = await Spot.findByPk(spotId)

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
            // Successful Response
            res.status(200)
            res.json(spotReview)
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
