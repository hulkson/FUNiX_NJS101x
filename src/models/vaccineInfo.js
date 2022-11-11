const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vaccineInfoSchema = new Schema({
  vaccine_type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  inject_times: {
   type: String,
   required: true,
 },
   heathStatus: {
      type: String,
      required: true,
   }
});

module.exports = mongoose.model("Vaccine-Info", vaccineInfoSchema);