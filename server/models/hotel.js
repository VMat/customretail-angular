/**
 * Created by Matías on 28/08/2017.
 */
const mongoose = require('mongoose');

// Mongoose productSchema definition
hotelsSchema = new mongoose.Schema({
  uniqueCode: Number,
  name  : String,
  image  : String,
  stars : Number,
  price : Number
});

let Hotels = mongoose.model('admin', hotelsSchema, 'Hotels');

module.exports = Hotels;

