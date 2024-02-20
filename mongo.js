const mongoose = require("mongoose");

require("dotenv").config();

console.log(process.env.STATUS);

// if (process.argv.length < 3) {
//   console.log("give password as argument");
//   process.exit(1);
// }

const password = process.env.SECRET_KEY;

const url = `mongodb+srv://helloMongo:${password}@cluster0.dgf0mlh.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model("Contact", contactSchema);

const contact = new Contact({
  name: "Nina Asparagus",
  number: "451-828-1890",
});

contact.save().then((result) => {
  console.log("contact saved!");
  mongoose.connection.close();
});
