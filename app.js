const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const csrf = require('csurf');
const User = require("./src/models/user");
const multer = require('multer');

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

const fileStorage = multer.diskStorage({
   destination: (req, file, cb) => {
     cb(null, 'images');
   },
   filename: (req, file, cb) => {
     const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
     cb(null, file.originalname + '-' + uniqueName);
   }
 });
 
 const fileFilter = (req, file, cb) => {
   if (
     file.mimetype === 'image/png' ||
     file.mimetype === 'image/jpg' ||
     file.mimetype === 'image/jpeg'
   ) {
     cb(null, true);
   } else {
     cb(null, false);
   }
 };

// set view handler
app.set("view engine", "ejs");
app.set("views", "src/views");

const adminRoutes = require("./src/routes/admin");
const authRoutes = require("./src/routes/auth");
const errorController = require("./src/controllers/error");

// config middileware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
// set public folder to static
app.use(express.static(path.join(__dirname, "public")));
app.use('/images', express.static(path.join(__dirname, 'images')));

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
      app.listen(process.env.PORT || 8080, '0,0,0,0', () => {
        console.log('Server is running..');
      });
   })
   .catch((err) => {
      console.log(err);
   });
