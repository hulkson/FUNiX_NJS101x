exports.getLogin = (req, res) => {
   res.render('../views/auth/login', {
      path: '/login',
      pageTitle: 'Login',
      isAuth: false,
   })
 };
 
 exports.postLogin = (req, res) => {
   req.session.isLoggedIn = true;
   res.redirect('/');
 };