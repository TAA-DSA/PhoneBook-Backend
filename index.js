const express = require("express");
const app = express();
const data = require("./data.json");

const PORT = 3001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello to your personal phonebook server");
});

app.get("/phonebook", (req, res) => {
  res.json(data);
});

app.listen(PORT, (req, res) => {
  console.log(`Server 🚀 running on ${PORT}`);
});
