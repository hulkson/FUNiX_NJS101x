const express = require('express');

const adminController = require('../controllers/adminController');

const router = express.Router();

// get homepage
router.get('/', (req, res) => {
    res.render('main/home');
  });

// navbar link page
router.get('/user-info', adminController.getUserInfoPage);
router.get('/working-info', adminController.getWorkingInfoPage);
router.get('/user-covid-info', adminController.getUserCovidInfoPage);
router.get('/login', adminController.getLoginPage);
router.get('/signup', adminController.getSignupPage);

// post method route
router.post('/checkin', adminController.postCheckin);
// router.post('/checkin', adminController.postCheckout);

module.exports = router;