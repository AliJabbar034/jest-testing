const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user.routes");

const app = express();

const port = 3000;

const url = "url";

mongoose
  .connect(url)
  .then(() => {
    console.log("connected successfully");
  })
  .catch((e) => {
    console.log(e.message);
    process.exit(0);
  });
app.use(express.json());
app.use("/user", router);

app.listen(3000, () => {
  console.log(`app is listening on ${port}`);
});

module.exports = app;
