const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const csrf = require('csurf');
const User = require("./src/models/user");

// connect mongoDb
const mongoose = require("mongoose");
const MONGODB_URI = "mongodb+srv://root:Hulkson052@cluster0.b0zgemo.mongodb.net/asm1?retryWrites=true&w=majority";
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// global variable
const app = express();
const store = new MongoDBStore({
   uri: MONGODB_URI,
   collection: 'sessions',
});

const csrfProtection = csrf();

// set view handler
app.set("view engine", "ejs");
app.set("views", "src/views");

const adminRoutes = require("./src/routes/admin");
const authRoutes = require("./src/routes/auth");
const errorController = require("./src/controllers/error");

// config middileware
app.use(bodyParser.urlencoded({ extended: false }));

// set public folder to static
app.use(express.static(path.join(__dirname, "public")));

//apply session
app.use(session({
   secret: 'my secret', 
   resave: false,
   saveUninitialized: false,
   store: store,
}));

app.use(csrfProtection);

app.use((req, res, next) => {
   res.locals.isAuth = req.session.isAuth;
   res.locals.csrfToken = req.csrfToken();
   next();
});

app.use((req, res, next) => {
   if (!req.session.user) {
     return next();
   }
   User.findById(req.session.user._id)
     .then(user => {
       if (!user) {
         return next();
       }
       req.user = user;
       next();
     })
     .catch(err => {
       next(new Error(err));
     });
 });

app.use("/", adminRoutes);
app.use(authRoutes);

app.use(errorController.get404);

// connect to database
mongoose
   .connect(MONGODB_URI)
   .then(() => {
      app.listen(3000);
   })
   .catch((err) => {
      console.log(err);
   });
