
// checkin-checkout-onleave button
exports.getCheckinPage = (req, res) => {
   res.render("main/checkin");
};

exports.postCheckinPage = (req, res, next) => {
  const workplace = req.body.workplace;
  res.redirect('./main/working-time-info', {
    workplace: workplace,
  });
};

exports.getOnleavePage = (req, res) => {
  res.render("main/onleave");
};

exports.getCheckoutPage = (req, res) => {
  res.render("main/checkout");
};

exports.getCheckoutPage = (req, res) => {
  res.render("main/checkout");
};

// navbar link page
exports.getUserInfoPage = (req, res) => {
  res.render("main/user-info");
};

exports.getWorkingTimeInfoPage = (req, res) => {
  res.render("main/working-time-info");
};

exports.getUserCovidInfoPage = (req, res) => {
  res.render("main/user-covid-info");
};

exports.getLoginPage = (req, res) => {
  res.render("main/login");
};

exports.getSignupPage = (req, res) => {
  res.render("main/signup");
};