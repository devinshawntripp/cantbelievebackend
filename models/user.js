const mongoose = require("mongoose");

const user = new mongoose.Schema({
  email: { type: String, required: false },
  password: { type: String, required: false },
  admin: { type: Boolean, required: false },
  vouchers: { type: Number, required: false },
  idsSaved: { type: [String], required: false },
});

module.exports = mongoose.model("user", user);
