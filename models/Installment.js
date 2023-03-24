const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InstallmentSchema = new Schema({
  loan: { type: Schema.Types.ObjectId, ref: 'Loan' },
  transactionId: { type: Schema.Types.ObjectId },
  transactionType: { type: String },
  utrNo : { type: String },
  transactionmode: { type: String },
  dueDate: { type: Date },
  dateTime: { type: Date },
  amount: { type: Number },
  purpose: { type: String },
  emiId: { type: Number },
  loanId: { type: String },
  partnerId: { type: String },
  status: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  paidDate: { type: Date },
});

module.exports = mongoose.model('Installment', InstallmentSchema);
