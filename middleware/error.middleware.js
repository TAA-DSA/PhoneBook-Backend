const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

app.use(express.json());

app.use(cors());

app.use(morgan("tiny"));

morgan.token("reqBody", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :reqBody"
  )
);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

module.exports = { app, errorHandler };
