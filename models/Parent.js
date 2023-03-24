const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParentSchema = new Schema({
  parentId: [{ type: Schema.Types.ObjectId}],
  firstName: { type: String},
  lastName: { type: String},
  aadhar: { type: String},
  pan: { type: String},
  email: { type: String},
  age: { type: Number},
  maritialStatus: { type: String},
  gender: { type: String},
  employmentType: { type: String},
  yoe: { type: Date},
  maritialStatus: { type: String},
  maritialStatus: { type: String},
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String }
  },
  form26AS: { type: Boolean },
  instituteId: { type: String },

});


module.exports = mongoose.model('Parent', ParentSchema);
