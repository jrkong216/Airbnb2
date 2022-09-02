// backend/routes/api/session.js
const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
// backend/routes/api/session.js
// ...
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// ...
const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];


const router = express.Router();

// Log in
router.post(
  '/',
  validateLogin,
  async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    // if (!user) {
    //   const err = new Error('Login failed');
    //   err.status = 401;
    //   err.title = 'Login failed';
    //   err.errors = ['The provided credentials were invalid.'];
    //   return next(err);
    // }
// Need to understand how to access user's current password and see if it mataches
    if (!user) {
      res.status(401)
      return res.json({
        message: "Invalid credntials",
        statusCode: 401
    })
    }

    // if(user.password !== password) {
    //   res.status(401)
    //   return res.json({
    //     message: "Invalid credntials",
    //     statusCode: 401
    // })
    // }

    const jwtToken = await setTokenCookie(res, user);

    const userData = {};
    userData.id = user.id;
    userData.firstName = user.firstName;
    userData.lastName = user.lastName;
    userData.email = user.email;
    userData.username = user.username;
    userData.token = jwtToken;

    return res.json({
        ...userData
    });
}
);

  // Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

  // ....

// Restore session user
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json(
        user.toSafeObject()
      );
    } else return res.status(401).res.json({
      message: "Authentication required",
      statusCode: 401
      });
  }
);

// ...

// backend/routes/api/session.js
// ...


  module.exports = router;
