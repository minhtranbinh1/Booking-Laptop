const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const slug = require('mongoose-slug-generator');
const moment = require('moment-timezone');
const dateHanoi = moment().tz("Asia/Ho_Chi_Minh").format();
var date = new Date(moment().tz("Asia/Ho_Chi_Minh").format());
var full = date.toUTCString()
var day = date.getDate(); 
var month = date.getMonth()+1; 
var year = date.getFullYear(); 
var hours = date.getHours(); 
var minutes = date.getMinutes();   
mongoose.plugin(slug);

const Order = new Schema({
  product: String,
  phone: String,
  idCustomer: String,
  email: String,
  address: String,
  totalMoney: Number,
  customer:String,
  status:{type:String, default:'Chưa xác nhận'},
  imageProduct: String,
  day:{ type: String, default: day},
  month:{ type: String, default: month},
  year:{ type: String, default: year},
  hours:{ type: String, default: hours},
  confirmBy: String,
  date: { type: Date, default : `${full}`} 
});

module.exports = mongoose.model('Orders', Order,'Orders');