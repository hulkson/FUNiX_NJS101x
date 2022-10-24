const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const User = require("./models/users");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// add middleware
app.use((req, res, next) => {
  User.findById("62dec61e987b0e7dcad0c52f")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// connect database
mongoose
  .connect(
    "mongodb+srv://root:Hulkson052@cluster0.b0zgemo.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then(() => {
    User.findOne()
    .then(user => {
      if (!user) {
        const user = new User({
          name: "Jake",
          email: "test@mail.com",
          cart: {
            items: [],
          }
        })
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
