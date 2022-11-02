const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const User = require("./src/models/user");

// connect mongoDb
const mongoose = require("mongoose");
const MONGODB_URI = "mongodb+srv://root:Hulkson052@cluster0.b0zgemo.mongodb.net/asm1?retryWrites=true&w=majority";

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
app.use((req, res, next) => {
  User.findById("63629bff61b52bc6a5ea396b")
  .then(user => {
      req.user = user;
      next();
  })
  .catch(err => {
      console.log(err);
  })
})

app.use("/", adminRoutes);

app.use(errorController.get404);

// connect to database
mongoose
   .connect(MONGODB_URI)
   .then(() => {
      User.findOne().then((user) => {
        if (!user) {
          const user = new User({
             name: "Trịnh Văn Musk",
             email: "musk@mail.com",
             doB: "1990-1-1",
             salaryScale: 1.0,
             startDate: "2021-1-1",
             department: "Công Ty",
             annualLeave: 10,
             image: "https://e7.pngegg.com/pngimages/96/836/png-clipart-elon-musk-sticker-chief-executive-telegram-musk-stick-hand-cartoon.png",
             progress: [],
          });
          user.save();
        }
      });
      app.listen(3000);
   })
   .catch((err) => {
      console.log(err);
   });
