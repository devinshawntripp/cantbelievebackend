const mongoose = require("mongoose");

const user = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  vouchers: { type: Number, required: false },
  idsSaved: { type: [String], required: false },
});

module.exports = mongoose.model("user", user);
