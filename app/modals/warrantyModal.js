const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const moment = require('moment-timezone');
var date = new Date(moment().tz("Asia/Ho_Chi_Minh").format());
var full = date.toUTCString()
const Warranty = new Schema({
  product: String,
  content: String,
  customer: String,
  emailCustomer: String,
  phoneCustomer: String,
  idCustomer: String,
  status:{ type: String, default:'Chưa nhận'},
  staff: { type: String, default:'admin'},
  note: String,
  date: { type: Date, default : `${full}`}
});

module.exports = mongoose.model('Warranty', Warranty,'Warranty');