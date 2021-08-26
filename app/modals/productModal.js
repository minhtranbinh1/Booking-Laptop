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

const Product = new Schema({
  name: String,
  introduce: String,
  price: Number,
  introducefull: String,
  slug: { type: String, slug: "name"},
  image: String,
  day:{ type: String, default: day},
  month:{ type: String, default: month},
  year:{ type: String, default: year},
  hours:{ type: String, default: hours},
  date: { type: Date, default : `${full}`} 
});

module.exports = mongoose.model('Product', Product,'Product');