// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const checkinList = [];

module.exports = class CheckinList {
  constructor(workplace) {
    this.workplace = workplace;
  };

  save() {
    checkinList.push(this);
  }

  static fetchAll() {
    return checkinList;
  }
};

// const checkinSchema = new Schema({
   
//  });
 
//  module.exports = mongoose.model("CheckinInfo", checkinSchema); // export model ra ngoài cùng constructor đã tạo