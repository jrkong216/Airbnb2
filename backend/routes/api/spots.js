const express = require('express');
const router = express.Router();

const { Spot, sequelize, Review, SpotImage} = require('../../db/models');

// Get All Spots including avgColumn and Rating
// Week 11 Thursday Practice Aggregate Data
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

return res.json({Spots: allSpots})
})




module.exports = router;
