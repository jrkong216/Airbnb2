const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Sequelize, SpotImage, ReviewImage } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.delete('/:imageId', requireAuth, async (req, res)=> {
    const selectedImage = await SpotImage.findByPk(req.params.imageId)
    if(!selectedImage){
        res.status(404);
        res.json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
        })
    }
    await selectedImage.destroy()
    res.status(200)
    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})
module.exports = router
