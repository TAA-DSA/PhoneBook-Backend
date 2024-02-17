const express = require("express");
const app = express();
const data = require("./data.json");
const fs = require("fs");
const morgan = require("morgan");
const cors = require("cors");

app.use(cors()); //Cross origin resource sharing

morgan("tiny");

const PORT = process.env.PORT || 3001;

app.use(express.json());

morgan.token("reqBody", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :reqBody"
  )
);

const sizeOfPhonebook = data.length;
//console.log(sizeOfPhonebook);

const date = new Date(Date.now());
const showDate = date.toString();
//console.log("Show Date :", showDate);

//Send html
app.get("/info", (req, res) => {
  try {
    const openingMessage = `<h2>Phonebook has info ${sizeOfPhonebook} people</h2>`;
    const currDate = `<p>${showDate}</p>`;
    const message = openingMessage + currDate;
    res.send(message);
  } catch (error) {
    console.error("Cannot render:", error);
  }
});

app.get("/api/persons", (req, res) => {
  res.json(data);
});

app.get("/api/persons/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    console.log("Requested ID:", id);

    // Log the entire data array to verify its structure
    console.log("Data:", data);

    const contact = data.find((item) => item.id === id);
    console.log("Found Contact:", contact);

    if (!contact) {
      console.log("Contact not found");
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json(contact);
  } catch (err) {
    console.error("Error:", err);
  }
});

//Generate id
const generateId = () => {
  const maxId = data.length > 0 ? Math.max(...data.map((n) => n.id)) : 0;
  return maxId + 1;
};

//Post Request
app.post("/api/persons", (req, res) => {
  try {
    const body = req.body;

    const contactObj = {
      id: generateId(),
      name: body.name,
      number: body.number,
    };

    const isDuplicate = data.some(
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
    }

    data.push(contactObj);

    fs.writeFileSync("./data.json", JSON.stringify(data));

    return res.send(contactObj);
  } catch (error) {
    console.error("Some thing doesn't feel right :", error);
  }

  //check why it is not writing in the data folder
  //fs.writeFile("./data.json", JSON.stringify({ contactObj }));
});

//Delete request
app.delete("/api/persons/:id", (req, res) => {
  //deletes from the server but not from database
  try {
    const id = Number(req.params.id);
    //console.log("req.params.id: ", id);
    const contact = data.find((items) => items.id === id);
    //console.log("Look for id:", contact);
    const contactIndex = data.indexOf(contact);

    if (contactIndex !== -1) {
      console.log("index of found contact:", contactIndex);
      data.splice(contactIndex, 1);
      console.log(data);
    }

    //Write new data to json
    fs.writeFileSync("./data.json", JSON.stringify(data));

    res.send("Contact deleted Successfully");
  } catch (error) {
    console.error("Something is not right", error);
  }
});

//

app.listen(PORT, (req, res) => {
  console.log(`Server 🚀 running on ${PORT}`);
});
