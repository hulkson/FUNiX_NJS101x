const User = require("../models/user");

exports.getLogin = (req, res) => {
   res.render("./main/login", {
     path: '/login',
     isAuth: false,
   });
 };

exports.postLogin = (req, res) => {
   const email = req.body.email;
   const password = req.body.password;
   User.findOne({email: email})
      .then(user => {
        if (!user) {
          return res.redirect('/login');
        }
        else {
          if (password === user.password) {
            req.session.isAuth = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              return res.redirect('/');
           })
          }
          else {
            res.redirect('/login');
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
};

 exports.postLogout = (req, res) => {
   req.session.destroy(err => {
      res.redirect('/');
   });
 };