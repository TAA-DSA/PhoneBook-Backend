const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

require("dotenv").config();

console.log(process.env.STATUS);

// if (process.argv.length < 3) {
//   console.log("give password as argument");
//   process.exit(1);
// }

const password = process.env.SECRET_KEY;

const url = process.env.URI;

//Another way to write this is using try and catch

const connectToDatabase = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.error("Error connecting to mongoDB", error);
  }
};

connectToDatabase();

//One way to write  this code and error handling
// mongoose
//   .connect(url)
//   .then((result) => {
//     console.log("Connected to mongoDB");
//   })
//   .catch((error) => {
//     console.log("Error connecting to mongoos", error);
//   });

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

//mongoose transform function
//toJSON just transforms it into string just to be safe

contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

//Cutomize mongo Schema

//const Contact = mongoose.model("Contact", contactSchema);

// const contact = new Contact({
//   name: "Nina Asparagus",
//   number: "451-828-1890",
// });

// contact.save().then((result) => {
//   console.log("contact saved!");
//   mongoose.connection.close();
// });

module.exports = mongoose.model("Contact", contactSchema);
