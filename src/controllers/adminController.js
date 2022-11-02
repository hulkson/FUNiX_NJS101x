const User = require('../models/user');

//get main app
exports.getApp = (req, res, next) => {
  let workHistory = req.user.progress.workHistory;
    const today = new Date();
    if (workHistory.length === 0) {
        res.render('./main/home', {
            name: req.user.name,
            email: req.user.email,
            image: req.user.image,
            workHistory: workHistory,
            status: req.user.progress.status,
            totalTime:0,
            annualLeave: '',
            today: today
        })
    }
    else {
        res.render('./main/home', {
            name: req.user.name,
            image: req.user.image,
            workHistory: workHistory,
            status: req.user.progress.status,
            annualLeave:req.user.annualLeave,
            today: today
        })
}
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
  const workplace = req.body.workplace;
  const date = new Date();
  req.user.progress.workHistory.push({
    checkin: date,
    checkout: '',
    workplace: workplace,
  });
  req.user.progress.status='false';
  req.user.save().then(() => {
    res.redirect('/');
  }
)};

exports.postCheckout = (req, res, next) => {
  const date = new Date();
    const length = req.user.progress.workHistory.length;
    req.user.progress.workHistory[length -1].checkout = date;
    req.user.progress.status='true';
    req.user.save().then(() => {  
        res.redirect('/');
    });
};