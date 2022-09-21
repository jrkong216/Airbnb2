const express = require('express');
const router = express.Router();

const { Spot, sequelize, Review, SpotImage, User, Booking, ReviewImage} = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth')

//* --------------------------Get all Reviews of the Current User----------------------------- */

router.get("/current", requireAuth, async (req, res, next) => {
        let reviewObj;
        let newArr = [];
        const allReviews = await Review.findAll({
            where: {
                userId:  req.user.id
            },

            include:[{
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: {
                    exclude: ['description', 'createdAt', 'updatedAt']
                },
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })

  // for (let spot of allReviews) {
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
  // return res.json({Reviews: allReviews})

    for (let i = 0; i< allReviews.length; i++){
        reviewObj = allReviews[i].toJSON();
        const previewImage = await SpotImage.findByPk(allReviews[i].id, {
            where: { preview: true },
            attributes: ['url'],
            raw: true
        })

        // reviewObj.Spot.previewImage = !previewImage ? '' : previewImage.url;
        // newArr.push(reviewObj)

        if (previewImage){
          reviewObj.Spot.previewImage = previewImage.url
          newArr.push(reviewObj)
        } else {
          reviewObj.Spot.previewImage = null
          newArr.push(reviewObj)
        }


    }
    res.status(200)
    res.json({ Reviews: newArr})
})



//* --------------------------Add an Image to a Review based on the Review's id----------------------------- */
router.post('/:reviewId/images', requireAuth, async (req, res) => {

  const reviewId = req.params.reviewId

  const { url} = req.body


const findReview = await Review.findByPk(reviewId)

  if (!findReview){
    res.status(404)
        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
      }

    const image = await ReviewImage.create({
      url,
      reviewId: parseInt(req.params.reviewId)
    })

    const object = {}

    object.id = image.id
    object.url = image.url


    res.status = 200
  return res.json(object)

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


  if (editReview) {
    editReview.set({ review, stars });
    await editReview.save()


    res.status(200)
    res.json(editReview)
  }
})


//* --------------------------Delete a Review----------------------------- */

router.delete('/:reviewId', async(req, res) => {

  const reviewId = req.params.reviewId
  const currentSpot = await Spot.findByPk(reviewId)

  if(!currentSpot){
      res.status(404)
      res.json({
          message: "Review couldn't be found",
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
