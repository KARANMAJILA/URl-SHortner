const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  shortUrl: { type: String },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  lastClicked: { type: Date }
});

module.exports = mongoose.model("Url", urlSchema);
