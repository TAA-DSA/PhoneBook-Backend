const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

app.use(express.json());

app.use(cors());

morgan("tiny");

morgan.token("reqBody", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :reqBody"
  )
);

module.exports = app;
