const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// connect mongoDb
const mongoose = require("mongoose");
const MONGODB_URI =
  "mongodb+srv://root:Hulkson052@cluster0.b0zgemo.mongodb.net/asm1?retryWrites=true&w=majority";

  // global variable
const app = express();

// set view handler
app.set("view engine", "ejs");
app.set("views", "src/views");

const adminRoutes = require("./src/routes/admin");
const errorController = require("./src/controllers/error");


// config middileware
app.use(bodyParser.urlencoded({ extended: false }));

// set public folder to static
app.use(express.static(path.join(__dirname, "public")));

//import routes
app.use("/admin", adminRoutes);

app.get('/', (req, res) => {
  res.render('main/home');
});

// app.get('/login', (req, res) => {
//   res.render('main/login');
// });

// app.get('/signup', (req, res) => {
//   res.render('main/signup');
// });

// app.get('/user-info', (req, res) => {
//   res.render('main/user-info');
// });

// app.get('/user-working-time', (req, res) => {
//   res.render('main/user-working-time');
// });

// app.get('/user-covid-info', (req, res) => {
//   res.render('main/user-covid-info');
// });

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