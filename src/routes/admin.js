const express = require('express');

const adminController = require('../controllers/adminController');

const isAuth = require('../../middleware/is-auth');

const router = express.Router();

// get homepage
router.get('/', adminController.getApp);

// navbar link page
router.get('/user-info', isAuth, adminController.getUserInfoPage);
router.get('/working-info', isAuth, adminController.getWorkingInfoPage);
router.get('/user-covid-info', isAuth, adminController.getUserCovidInfoPage);
router.get('/user-covid-info/:userId', isAuth, adminController.getworkingSheet);
router.get('/manage', isAuth, adminController.getManagePage);

// post method route
router.post('/checkin', isAuth, adminController.postCheckin);
router.post('/checkout', isAuth, adminController.postCheckout);
router.post('/user-info', isAuth, adminController.postUserInfoPage);
router.post('/onleave', isAuth, adminController.postOnleave);
router.post('/vaccine-info', isAuth, adminController.postVaccineInfo);
router.post('/temperature-info', isAuth, adminController.postTemperatureInfo);
router.post('/manage-change-status', isAuth, adminController.postManageChangeStatus);
router.post('/manage-delete-work', isAuth, adminController.postManageDeleteWork);

module.exports = router;