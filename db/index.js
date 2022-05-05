const mongoose = require("mongoose");

require("dotenv").config();

mongoose
  .connect(process.env.MONGOCONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  })
  .then(() => {
    console.log("Connection to mongodb established");
  });

const db = mongoose.connection;

module.exports = db;
