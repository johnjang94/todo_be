const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
require("dotenv").config();
const cors = require("cors");

const MONGODB_URI_PRODUCTION = process.env.MONGODB_URI_PRODUCTION;
console.log("database address", MONGODB_URI_PRODUCTION);

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api", indexRouter);
const mongoURI = MONGODB_URI_PRODUCTION;
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("mongoose connected!"))
  .catch((err) => console.log("connection failed", err));

app.listen(process.env.PORT || 6060, () => {
  console.log("the server is listening on 6060");
});
