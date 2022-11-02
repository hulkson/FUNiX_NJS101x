const CheckinList = require('../models/checkinList');

exports.getOnleavePage = (req, res) => {
  res.render("./main/onleave");
};

exports.getCheckoutPage = (req, res) => {
  res.render("./main/checkout");
};

exports.getCheckoutPage = (req, res) => {
  res.render("./main/checkout");
};

// navbar link page
exports.getUserInfoPage = (req, res) => {
  res.render("./main/user-info");
};

exports.getWorkingInfoPage = (req, res) => {
  res.render("./main/working-info");
};

exports.getUserCovidInfoPage = (req, res) => {
  res.render("./main/user-covid-info");
};

exports.getLoginPage = (req, res) => {
  res.render("./main/login");
};

exports.getSignupPage = (req, res) => {
  res.render("./main/signup");
};

// post link
exports.postCheckin = (req, res, next) => {
  console.log('abc');
};