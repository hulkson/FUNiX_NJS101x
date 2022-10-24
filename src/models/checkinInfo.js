const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const checkinSchema = new Schema({
   date: {
     type: Date,
     required: true,
   },
   workPlace: {
     type: String,
     required: true,
   },
   anualLeave: {
     type: Number,
     required: true,
   },
   startTime: {
     type: Datetime,
     required: true,
   },
   endTime: {
      type: Datetime,
      required: true,
    },
    totalTime: {
      type: Datetime,
      required: true,
    },
    workstatus: {
      type: Boolean,
      required: true,
    },
   userId: {
     type: Schema.Types.ObjectId,
     ref: "User",
     required: true,
   },
 });
 
 module.exports = mongoose.model("CheckinInfo", checkinSchema); // export model ra ngoài cùng constructor đã tạo