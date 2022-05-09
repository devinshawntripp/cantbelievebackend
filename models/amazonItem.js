const mongoose = require("mongoose");

const amazonItemSchema = new mongoose.Schema({
  name: { type: String, required: false },
  url: { type: String, required: false },
  desc: { type: String, required: false },
  imgUrl: { type: String, required: false },
  saves: { type: Number, required: false },
});

module.exports = mongoose.model("amazonItems", amazonItemSchema);
