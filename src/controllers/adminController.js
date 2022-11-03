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

// navbar link page
exports.getUserInfoPage = (req, res) => {
  console.log(req.user);
  res.render("./main/user-info", {user: req.user});
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

exports.postUserInfoPage = (req, res) => {
  req.user.image = req.body.imageUrl;
  req.user.save()
  .then(()=> {
    res.redirect('user-info');
  })
};

exports.postOnleave = (req, res) => {
  const annualValidate = req.body.dateSelected.split(',')
  const annualRemain = req.user.annualLeave * 8 - annualValidate.length * req.body.timeSelected
  annualValidate.forEach(annualCheck => {
    annualCheck = new Date(annualCheck)
      req.user.progress.annual.push({
        annualDate: annualCheck,
        annualTime: parseInt(req.body.timeSelected),
        reason: req.body.onleaveReason
      });
    });
    req.user.annualLeave = annualRemain / 8
    req.user.save()
    .then(() => {
      res.redirect('/');
    })
};