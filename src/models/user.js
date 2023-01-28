const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
   accountType: {
      type: String,
      required: true,
   },
   doB: {
      type: String,
      required: true,
   },
   salaryScale: {
      type: Number,
      required: true,
   },
   startDate: {
      type: String,
      required: true,
   },
   department: {
      type: String,
      required: true,
   },
   annualLeave: {
      type: Number,
   },
   image: {
      type: String,
      required: true,
   },
   vaccineInfo: [
      {
         injectDate: {
            type: Date,
            required: true,
          },
          vaccineNumber: {
            type: String,
            required: true,
          },
          vaccineType: {
            type: String,
            required: true,
          }
      }
   ],
   bodyTemperatureInfo: [
      {
         declareDate: {
            type: Date,
            required: true,
          },
          declareTime: {
            type: String,
            required: true,
          },
          bodyTemperature: {
            type: Number,
            required: true,
          },
          healthStatus: {
            type: String,
            required: true,
          },
      }
   ],
   progress: {
      workHistory: [
         {
            checkin: {
               type: Date,
            },
            checkout: {
               type: Date,
            },
            workplace: {
               type: String,
            },
         },
      ],
      annual: [
         {
            annualDate: {
               type: String,
            },
            annualTime: {
               type: Number,
            },
            reason: {
               type: String,
            },
         },
      ],
      status: {
         type: String,
         default: "true",
      },
   },
});

module.exports = mongoose.model("User", userSchema);
