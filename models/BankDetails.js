const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BankDetailsSchema = new Schema({
  accountNumber: { type: String },
  ifsc: { type: String },
  accountType: { type: String },
  accountHolderName: { type: String },
  branchAddress: { type: String },
  createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BankDetails', BankDetailsSchema);
