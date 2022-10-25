
// checkin-checkout-onleave button
exports.getCheckinPage = (req, res) => {
   res.render("main/checkin");
};

exports.postCheckinPage = (req, res, next) => {
  const mytime = req.body.mytime;
  console.log(mytime);
  res.redirect('/checkin');
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