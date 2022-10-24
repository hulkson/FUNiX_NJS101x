const express = require("express");

const router = express.Router();

router.get("/add-product", (req, res, next) => {
  res.send(`<html>
  <head> 
      <title>Homepage</title>
  </head>
  <body>
      <h1>My Form</h1>
      <form action='/admin/add-product' method='POST'>
          <input type='text' name='message'>
          <button type='submit'>Submit</button>
      <form>
  </body>
  </html`);
});

router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
