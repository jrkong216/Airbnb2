const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

  //validates user
  const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
      check('firstName')
      .exists({ checkFalsy: true })
      .isLength({ min: 1 })
      .withMessage('Please provide a longer firstName'),
      check('lastName')
      .exists({ checkFalsy: true })
      .isLength({ min: 1 })
      .withMessage('Please provide a longer lastName'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

// Sign up

router.post(
  '/',
  validateSignup,
  async (req, res, next) => {
    const { email, password, username, firstName, lastName } = req.body;

    if(!username || !email){
      res.status(400);
      return res.json({
          "message": "Validation error",
          "statusCode": 400,
          "errors": {
            "email": "Invalid email",
            "username": "Username is required",
            "firstName": "First Name is required",
            "lastName": "Last Name is required"
          }
      })
    }
    const emailExisted = await User.findOne({where: {email}});

    // if(emailExisted){
    //   res.status(403);
    //   res.json({
    //     "message": "User already exists",
    //     "statusCode": 403,
    //     "errors": {
    //       "email": "User with that email already exists"
    //     }
    //   })
    // }

    if (emailExisted){
      const err = new Error("User already exists")
      err.status = 403
      err.title = "Login failed"
      err.errors = ["User with that email already exists"]
      return next(err)
    }


    const userExisted = await User.findOne({where: {username}});
    if(userExisted){
      res.status(403);
      res.json({

        "message": "User already exists",
        "statusCode": 403,
        "errors": {
          "email": "User with that username already exists"
        }
      })
    }
    const user = await User.signup({ firstName, lastName, email, username, password });
    let token = await setTokenCookie(res, user);
    let newUser = user.toJSON()
    newUser.token = token;
    return res.json(newUser);
  }

);



module.exports = router;
