const express = require('express');

const adminController = require('../controllers/adminController');

const router = express.Router();

router.get('/checkin', adminController.getCheckinPage);

router.get('/onleave', adminController.getOnleavePage);

router.get('/checkout', adminController.getCheckoutPage);

module.exports = router;