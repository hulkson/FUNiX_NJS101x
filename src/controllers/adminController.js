const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const User = require("../models/user");
const fileHelper = require('../controllers/deleteOldFile');

const ITEMS_PER_PAGE = 3;

//get main app
exports.getApp = (req, res, next) => {
  res.render("./main/home", { 
    user: req.user,
    path: '/',
   });
};

// navbar link page
exports.getUserInfoPage = (req, res) => {
  res.render("./main/user-info", { 
    user: req.user,
    path: '/user-info', 
  });
};

exports.getWorkingInfoPage = (req, res) => {
  const page = req.query.page;

  const workHistories = new Array();
  //create Date list
  let tempDate = [];
  for (let i = 0; i < req.user.progress.workHistory.length; i++) {
    let date = req.user.progress.workHistory[i].checkin
      .toDateString()
      .replace(/^\S+\s/, "");
    tempDate.push(date);
  }
  for (let i = 0; i < req.user.progress.annual.length; i++) {
    let date = new Date(req.user.progress.annual[i].annualDate);
    tempDate.push(date.toDateString().replace(/^\S+\s/, ""));
  }
  let dateLog = [...new Set(tempDate)];
  //create Date List
  //create workHistory Log
  let tempWorkHis = [];
  let t = [];

  for (let i = 0; i < req.user.progress.workHistory.length - 1; i++) {
    if (
      req.user.progress.workHistory[i + 1].checkin
        .toDateString()
        .replace(/^\S+\s/, "") ===
      req.user.progress.workHistory[i].checkin
        .toDateString()
        .replace(/^\S+\s/, "")
    ) {
      t.push(req.user.progress.workHistory[i]);
    } else {
      t.push(req.user.progress.workHistory[i]);
      tempWorkHis.push(t);
      t = [];
    }
  }
  if (
    req.user.progress.workHistory[
      req.user.progress.workHistory.length - 1
    ].checkin
      .toDateString()
      .replace(/^\S+\s/, "") ===
    req.user.progress.workHistory[
      req.user.progress.workHistory.length - 2
    ].checkin
      .toDateString()
      .replace(/^\S+\s/, "")
  ) {
    t.push(
      req.user.progress.workHistory[req.user.progress.workHistory.length - 1]
    );
  } else {
    t = [
      req.user.progress.workHistory[req.user.progress.workHistory.length - 1],
    ];
  }
  tempWorkHis.push(t);

  //create workHistory Log

  for (let i = 0; i < dateLog.length; i++) {
    let dateValue = dateLog[i];
    let workHis = new Array();
    let annual = 0;
    tempWorkHis.forEach((tmp) => {
      if (tmp[0].checkin.toDateString().replace(/^\S+\s/, "") === dateValue) {
        workHis = tmp;
      }
    });
    req.user.progress.annual.forEach((tp) => {
      let date = new Date(tp.annualDate);
      if (date.toDateString().replace(/^\S+\s/, "") === dateValue) {
        annual = tp.annualTime;
      }
    });
    let j = { date: dateValue, workHis: workHis, annual: annual };
    workHistories.push(j);
  }
  
  User.find({ accountType: "admin" })
    .then(
      (admin) => {
        let managerId = admin[0]._id;
        let managerName = admin[0].name;
        res.render("./main/working-info", {
          managerId: managerId,
          managerName: managerName,
          user: req.user,
          workHistories: workHistories,
          path: '/working-info',
        });
      }
  );
};

exports.getUserCovidInfoPage = (req, res) => {
  User.find({ accountType: "user" })
    .then(
      (userList) => {
        res.render("./main/user-covid-info", { 
          userList: userList,
          user: req.user,
          path: '/user-covid-info',
        });
      }
  );
};

exports.getManagePage = (req, res) => {
  User.find({ accountType: "user" })
    .then(
      (userList) => {
        res.render("./main/manage", { 
          userList: userList,
          user: req.user,
          path: '/manage',
        });
      }
  );
};

exports.getLoginPage = (req, res) => {
  res.render("./main/login", {
    path: '/login',
  });
};

exports.getworkingSheet = (req, res, next) => {
  const userId = req.params.userId;
  User.find({ _id: userId })
    .then(user => {
      const sheetName = 'sheet-' + userId + '.pdf';
      const sheetPath = path.join('data', 'working-sheet', sheetName);

      const pdfDoc = new PDFDocument();
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        'inline; filename="' + sheetName + '"'
      );
      pdfDoc.pipe(fs.createWriteStream(sheetPath));
      pdfDoc.pipe(res);

      pdfDoc.fontSize(26).text('Personal Vaccine Info', {
        underline: true
      });
      pdfDoc.text('-----------------------');
      user[0].vaccineInfo.forEach(infoRow => {
        pdfDoc.fontSize(14).text('Vaccine Number: ' + infoRow.vaccineNumber);
        pdfDoc.fontSize(14).text('Vaccine Type: ' + infoRow.vaccineType);
        pdfDoc.fontSize(14).text('Date: ' + infoRow.injectDate.toDateString().replace(/^\S+\s/, ""));
        pdfDoc.fontSize(14).text('-----------------------');
      });
      pdfDoc.end();
    })
};

// post link
exports.postCheckin = (req, res, next) => {
  const workplace = req.body.workplace;
  const date = new Date();
  req.user.progress.workHistory.push({
    checkin: date,
    checkout: "",
    workplace: workplace,
  });
  req.user.progress.status = "false";
  req.user.save().then(() => {
    res.redirect("/");
  });
};

exports.postCheckout = (req, res, next) => {
  const date = new Date();
  const length = req.user.progress.workHistory.length;
  req.user.progress.workHistory[length - 1].checkout = date;
  req.user.progress.status = "true";
  req.user.save().then(() => {
    res.redirect("/");
  });
};

exports.postUserInfoPage = (req, res) => {
  fileHelper.deleteFile(req.user.image);
  const image = req.file;
  req.user.image = image.path;
  req.user.save().then(() => {
    res.redirect("user-info");
  });
};

exports.postOnleave = (req, res) => {
  const annualValidate = req.body.dateSelected.split(",");
  const annualRemain =
    req.user.annualLeave * 8 - annualValidate.length * req.body.timeSelected;
  annualValidate.forEach((annualCheck) => {
    annualCheck = new Date(annualCheck);
    req.user.progress.annual.push({
      annualDate: annualCheck,
      annualTime: parseInt(req.body.timeSelected),
      reason: req.body.onleaveReason,
    });
  });
  req.user.annualLeave = annualRemain / 8;
  req.user.save().then(() => {
    res.redirect("/");
  });
};

exports.postVaccineInfo = (req, res) => {
  const injectDate = req.body.injectDate;
  const vaccineNumber = req.body.vaccineNumber;
  const vaccineType = req.body.vaccineType;
  req.user.vaccineInfo.push({
    injectDate: injectDate,
    vaccineNumber: vaccineNumber,
    vaccineType: vaccineType,
  });
  req.user.save().then(() => {
    res.redirect("/user-covid-info");
  });
};

exports.postTemperatureInfo = (req, res) => {
  const declareDate = req.body.declareDate;
  const declareTime = req.body.declareTime;
  const bodyTemperature = req.body.bodyTemperature;
  const healthStatus = req.body.healthStatus;
  req.user.bodyTemperatureInfo.push({
    declareDate: declareDate,
    declareTime: declareTime,
    bodyTemperature: bodyTemperature,
    healthStatus: healthStatus,
  });
  req.user.save().then(() => {
    res.redirect("/user-covid-info");
  });
};

exports.postManageChangeStatus = (req, res) => {
  const userId = req.body.userId;
  User.find({ _id: userId })
    .then(user => {
      const date = new Date();
      const length = user[0].progress.workHistory.length;
      user[0].progress.workHistory[length - 1].checkout = date;
      user[0].progress.status = 'true';
      user[0].save().then(() => {
        res.redirect("/manage");
      });
    })
};

exports.postManageDeleteWork = (req, res) => {
  const userId = req.body.userId;
  const workingId = req.body.workingId;
  User.find({ _id: userId })
    .then(user => {
      user[0].removeFromUser(user[0], workingId)
      .then((err) => {
        res.redirect("/manage");
      });
    })
};


