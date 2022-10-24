// Bố cục với Partials EJS

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

const adminData = require("./routes/admin");
const shopRouter = require("./routes/shop");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminData.routes);
app.use(shopRouter);
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "404 not found!",
  });
});

app.listen(3000);
