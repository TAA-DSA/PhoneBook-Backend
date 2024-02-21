const express = require("express");
const app = express();
const data = require("./data.json");
const fs = require("fs");
const morgan = require("morgan");
const cors = require("cors");
const Contact = require("./models/mongo.js");
const { default: mongoose } = require("mongoose");

require("dotenv").config();

app.use(cors()); //Cross origin resource sharing

morgan("tiny");

const PORT = process.env.PORT || 3000;

app.use(express.json());

//initiating middleware morgan

morgan.token("reqBody", function (req, res) {
  return JSON.stringify(req.body);
});

//Asking app to use middleware

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :reqBody"
  )
);

const date = new Date(Date.now());
const showDate = date.toString();
//console.log("Show Date :", showDate);

//Send html
app.get("/info", async (req, res) => {
  try {
    const numberOfContact = await Contact.countDocuments();
    const openingMessage = `<h2>Phonebook has info ${numberOfContact} people</h2>`;
    const currDate = `<p>${showDate}</p>`;
    const message = openingMessage + currDate;
    res.send(message);
  } catch (error) {
    console.error("Cannot render, please check error:", error);
  }
});

app.get("/api/persons", async (req, res) => {
  try {
    const contact = await Contact.find({});
    res.json(contact);
    console.log("All saved contact are sent to Front-end");
  } catch (error) {
    console.error("Cannot find contacts", error);
  }
});

//Search by Id get request
app.get("/api/persons/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Requested ID:", id);

    // Log the entire data array to verify its structure

    const contact = await Contact.findById(id);
    console.log("Hurray Id found", contact);

    // const contact = Contact.map((item) => item.id === id);
    // console.log("Found Contact:", contact);

    if (!contact) {
      console.log("Contact not found");
      return res.status(404).end();
    }

    res.json(contact);
  } catch (err) {
    console.error("Error:", err);
  }
});

// //Generate id
// const generateId = () => {
//   const maxId = data.length > 0 ? Math.max(...data.map((n) => n.id)) : 0;
//   return maxId + 1;
// };

//Post Request integrate with mongo, check later
app.post("/api/persons", async (req, res) => {
  try {
    const body = req.body;

    const contactObj = new Contact({
      name: body.name,
      number: body.number,
    });

    const allRecords = await Contact.find({});
    console.log("all records", allRecords);

    const isDuplicate = allRecords.some(
      (elements) =>
        elements.name.toLocaleLowerCase() ===
        contactObj.name.toLocaleLowerCase()
    );

    if (!contactObj.name || !contactObj.number || isDuplicate) {
      let errorMessage = "";
      if (!contactObj.name || !contactObj.number) {
        errorMessage = "name and number cannot be empty";
      } else {
        errorMessage = "name should be unique";
      }
      res.status(400).json({ error: errorMessage });
    } else {
      savedContact = await contactObj.save();
      return res.send(savedContact);
    }
    //data.push(contactObj);
    // fs.writeFileSync("./data.json", JSON.stringify(data));
  } catch (error) {
    console.error("Some thing doesn't feel right :", error);
  }
});

//Delete request
app.delete("/api/persons/:id", async (req, res) => {
  //deletes from the server but not from database
  try {
    const id = Number(req.params.id);
    //console.log("req.params.id: ", id);
    const contact = await Contact.findById(id);
    console.log("Look for id:", contact);
    //const contactIndex = data.indexOf(contact);

    if (contactIndex !== -1) {
      console.log("index of found contact:", contactIndex);
      data.splice(contactIndex, 1);
      console.log(data);
    }

    //Write new data to json
    //fs.writeFileSync("./data.json", JSON.stringify(data));

    res.send("Contact deleted Successfully");
  } catch (error) {
    console.error("Cannot delete, please check error", error);
  }
});

//

app.listen(PORT, (req, res) => {
  console.log(`Server 🚀 running on ${PORT}`);
});
