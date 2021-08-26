const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Token = new Schema({
  refreshToken: String,
  userid: String,
});

module.exports = mongoose.model('Token', Token,'refreshToken');