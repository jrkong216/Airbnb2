const express = require('express');
const router = express.Router();

const { Spot, sequelize, Review, SpotImage, User, Booking, ReviewImage} = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth')

//* --------------------------Get all Reviews of the Current User----------------------------- */

router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id

    const allReviews = await Review.findAll({
        where:{userId: userId},
        include:
          [{model: Spot, attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price"]},
          {model: ReviewImage, attributes: ['id','url'] }],
        group:['Review.id'],
        raw: true
    })

    for (let review of allReviews) {
      const spotImage = await SpotImage.findOne({
          attributes: ['url'],
          where: {
              preview: true,
              spotId: review.id
          },
          raw: true
      })
      if (spotImage) {
        review.previewImage = spotImage.url
    } else {
        review.previewImage = null
    }
}

      res.status(200)
    return res.json({ Reviews: allReviews })

  })

//* --------------------------Add an Image to a Review based on the Review's id----------------------------- */
router.post('/:reviewId/images', requireAuth, async (req, res) => {

  const reviewId = req.params.reviewId

  const { url} = req.body


const findReview = await Review.findByPk(reviewId)

  if (!findReview){
    res.status(404)
        return res.json({
            "message": "Spot couldn't be found", //shouldn't this be review couldnt be found
            "statusCode": 404
        })
      }

    const image = await ReviewImage.create({
      url
    })

    image.url = url

    res.status = 200
  return res.json({image})

})
//* --------------------------Edit a Review----------------------------- */

router.put('/:reviewId', requireAuth, restoreUser, async (req, res) => {
  const { reviewId } = req.params
  const { review, stars } = req.body

  const editReview = await Review.findByPk(reviewId)

  // Error Response: Body validation errors
  if (stars < 1 || stars > 5) {
    res.status(400)
    res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        review: "Review text is required",
        stars: "Stars must be an integer from 1 to 5",
      }
    })
  }

  if (!editReview){
    res.status(404)
    res.json({
      message: "Review couldn't be found",
      statusCode: 404
    })
  }

  // edit review
  if (editReview) {
    editReview.set({ review, stars });
    await editReview.save()

    // Successful Response
    res.status(200)
    res.json(editReview)
  }
})
module.exports = router;
