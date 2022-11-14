const User = require('../models/user');

exports.getLogin = (req, res) => {
   res.render('../views/auth/login', {
      path: '/login',
      pageTitle: 'Login',
      isAuth: false,
   })
 };
 
 exports.postLogin = (req, res) => {
  User.findById('62dec61e987b0e7dcad0c52f')
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.session.save(err => {
        console.log(err);
        res.redirect('/');
      });
    })
    .catch(error => {
      console.log(error);
    })
 };

 exports.postLogout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/'); // task will  run when done destroy
  });
 };