const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParentSchema = new Schema({
  parentId: [{ type: Schema.Types.ObjectId}],
  firstName: { type: String},
  lastName: { type: String},
  aadhar: { type: String},
  phone: { type: String },
  pan: { type: String},
  email: { type: String},
  age: { type: Number},
  maritialStatus: { type: String},
  gender: { type: String},
  employmentType: { type: String},
  yoe: { type: Date},
  maritialStatus: { type: String},
  maritialStatus: { type: String},
  address: {type:String},
  form26AS: { type: Boolean },
  instituteId: { type: String },
  data :{type: Object},
  kyc:{type:Object},
  validate:{type:Object},
  report:{type:Object}
});


module.exports = mongoose.model('Parent', ParentSchema);
