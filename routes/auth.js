const express = require('express');
const { check, body } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post('/signup', 
   [
      check('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject(
              'E-Mail exists already, please pick a different one.'
            );
          }
        });
      }),
      body('password')
         .isAlphanumeric()
         .isLength({ min: 5 })
         .withMessage('enter password with number and text at least 5 characters'),
      body('confirmPassword')
         .custom((value, { req }) => {
            if (value !== req.body.password) {
               throw new Error('password do not match')
            }
            return true;
         })
   ], authController.postSignup);

router.post('/logout', authController.postLogout);

module.exports = router;