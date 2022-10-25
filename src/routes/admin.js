const express = require('express');

const adminController = require('../controllers/adminController');

const router = express.Router();

// checkin-checkout-onleave button
router.get('/checkin', adminController.getCheckinPage);
router.get('/onleave', adminController.getOnleavePage);
router.get('/checkout', adminController.getCheckoutPage);

// navbar link page
router.get('/user-info', adminController.getUserInfoPage);
router.get('/working-time-info', adminController.getWorkingTimeInfoPage);
router.get('/user-covid-info', adminController.getUserCovidInfoPage);

// post method route
router.post('/checkin', adminController.postCheckinPage);

module.exports = router;