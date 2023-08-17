const mongoose = require("mongoose");

const travelSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  destination: { type: String, enum: ["India", "Africa", "Europe", "America"] },
  travelers: { type: Number },
  budget: { type: Number },
});

const TravelModel = mongoose.model("travel", travelSchema);

module.exports = { TravelModel };
