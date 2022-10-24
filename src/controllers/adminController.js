exports.getCheckinPage = (req, res) => {
   res.render("main/checkin");
};

exports.getOnleavePage = (req, res) => {
  res.render("main/onleave");
};

exports.getCheckoutPage = (req, res) => {
  res.render("main/checkout");
};
