const User = require('../models/user');

exports.getLogin = (req, res) => {
   res.render('../views/auth/login', {
      path: '/login',
      pageTitle: 'Login',
      isAuth: false,
   })
 };

 exports.getSignup = (req, res) => {
  res.render('../views/auth/signup', {
     path: '/signup',
     pageTitle: 'signup',
     isAuth: false,
  })
};
 
 exports.postLogin = (req, res) => {
  User.findById('62dec61e987b0e7dcad0c52f')
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect('/');
    })
    .catch(error => {
      console.log(error);
    })
 };

 exports.postSignup = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        return res.redirect('/signup');
      }
      const user = new User({
        email: email,
        password: password,
        cart: { items: [] }
      });
      return user.save();
    })
    .then(result => {
      res.redirect('/login');
    })
    .catch(err => {
      console.log(err);
    });
 };

 exports.postLogout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/'); // task will  run when done destroy
  });
 };