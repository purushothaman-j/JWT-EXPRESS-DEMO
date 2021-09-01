const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");

const app = express();

// parse application/json
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  const hashedPass = await bcrypt.hash("omg", 12);
  const token = jwt.sign({ pass: hashedPass }, "somesupersecret", {
    expiresIn: "1h",
  });
  const decodedToken = jwt.verify(token, "somesupersecret");
  //const decodedToken = await promisify(jwt.verify)(token,"somesupersecret")

  res.send({ hashedPass, token, legit: decodedToken.pass });
});

app.use("/user", userRoutes);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    status: "error",
    message: error.message,
  });
});

mongoose
  .connect(
    "mongodb+srv://sched-user:axzx6skIMRWAo1aO@schedcheck.gqzgt.mongodb.net/jwtdemo?authSource=admin&replicaSet=atlas-q0revq-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"
  )
  .then((result) => {
    console.log("DB connection successful!");
  });

app.listen(3000);
