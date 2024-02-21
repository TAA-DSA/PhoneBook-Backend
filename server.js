const app = require("./middleware/error.middleware.js");
const data = require("./data.json");
const route = require("./routes/index.routes");
const Contact = require("./models/mongo.js");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use("/", route);

app.listen(PORT, (req, res) => {
  console.log(`Server 🚀 running on ${PORT}`);
});
