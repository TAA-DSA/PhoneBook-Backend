const mongoose = require("mongoose");

require("dotenv").config();

const status = process.env.STATUS;
console.log("Status :", status);

const password = process.env.SECRET_KEY;

const url = process.env.URI;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.error("Error connecting to mongoDB", error);
  }
};

module.exports = connectToDatabase;
