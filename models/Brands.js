const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrandsSchema = new Schema({
  name: { type: String },
  Id: [{ type: Number}],
  collaboration : [{ type: String}]
});

module.exports = mongoose.model('Brands', BrandsSchema);
