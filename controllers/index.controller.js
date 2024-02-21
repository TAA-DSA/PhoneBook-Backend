const mongoose = require("mongoose");
const Contact = require("./../models/mongo");

const createContact = async (req, res) => {
  try {
    const body = req.body;

    const contactObj = new Contact({
      name: body.name,
      number: body.number,
    });

    const allRecords = await Contact.find({});
    //console.log("all records", allRecords);

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
    res.status(500).end();
  }
};

const indexPage = async (req, res) => {
  try {
    const date = new Date(Date.now());
    const showDate = date.toString();
    const numberOfContact = await Contact.countDocuments();
    const openingMessage = `<h2>Phonebook has info ${numberOfContact} people</h2>`;
    const currDate = `<p>${showDate}</p>`;
    const message = openingMessage + currDate;
    res.send(message);
  } catch (error) {
    console.error("Cannot render, please check error:", error);
  }
};

const updateNumberOnly = async (req, res) => {
  try {
    const matchName = { name: req.params.name };
    console.log("matchName :", matchName);
    const newNumber = { number: req.body.number };
    console.log("newNumber :", newNumber);
    const updateNumber = await Contact.findOneAndUpdate(matchName, newNumber);
    res.json("Successfully updated contact number");
  } catch (error) {
    console.error("Cannot update, please check err", error);
  }
};

const getAllContact = async (req, res) => {
  try {
    const contact = await Contact.find({});
    res.json(contact);
    console.log("All saved contact are sent to Front-end");
  } catch (error) {
    console.error("Cannot find contacts", error);
  }
};

const getContactById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Requested ID:", id);

    const contact = await Contact.findById(id);
    console.log("Hurray Id found", contact);

    if (!contact) {
      console.log("Contact not found");
      return res.status(404).end();
    }

    res.json(contact);
  } catch (err) {
    console.error("Error:", err);
    res.status(400).send({ error: "malformatted id" });
  }
};

const deleteAllContact = async (req, res) => {
  try {
    const id = req.params.id;
    //console.log("req.params.id: ", id);
    const contact = await Contact.findByIdAndDelete(id);
    console.log("Look for id:", contact);

    res.send("Contact deleted Successfully");
  } catch (error) {
    console.error("Cannot delete, please check error", error);
  }
};

module.exports = {
  createContact,
  updateNumberOnly,
  indexPage,
  getAllContact,
  getContactById,
  deleteAllContact,
};