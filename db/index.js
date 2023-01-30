const mongoose = require("mongoose");

require("dotenv").config();

mongoose
  .connect(process.env.MONGOCONNECTION, {
    // family: 4,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection to mongodb established");
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
