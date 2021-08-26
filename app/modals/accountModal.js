const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const moment = require('moment-timezone');
const dateHanoi = moment().tz("Asia/Ho_Chi_Minh").format();
var date = new Date(moment().tz("Asia/Ho_Chi_Minh").format());
var full = date.toUTCString()
var day = date.getDate(); 
var month = date.getMonth()+1; 
var year = date.getFullYear(); 
var hours = date.getHours(); 
var minutes = date.getMinutes();   

const Account = new Schema({
  username: String,
  password: String,
  phone: String,
  name: String,
  email: String,
  address: String,
  id: String,
  isadmin:{ type: Boolean, default:false},
  role:{type: String, default: 'user'},
  idGoogle: String,
  type: {type: String, default: 'Khách hàng tiềm năng'},
});

module.exports = mongoose.model('Accounts', Account,'Accounts');