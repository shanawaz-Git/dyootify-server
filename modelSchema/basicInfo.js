const mongoose = require("mongoose");
const basicInfoSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    age: Number,
  },
  { timestamps: true }
);
module.exports = mongoose.model("basicInfo", basicInfoSchema);
