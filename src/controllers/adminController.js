const CheckinList = require('../models/checkinList');


// checkin-checkout-onleave button
exports.getCheckinPage = (req, res) => {
   res.render("./main/checkin");
};

exports.postCheckinPage = (req, res, next) => {
  const checkin = new CheckinList(req.body.workplace);
  checkin.save();
  res.redirect('/working-time-info');
};
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

exports.getWorkingTimeInfoPage = (req, res) => {
  const checkin = CheckinList.fetchAll();
  console.log(checkin);
  res.render("./main/working-time-info", {workplace: checkin[0].workplace});
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