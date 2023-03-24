const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
  customer: { type: Schema.Types.ObjectId },
  invoiceId: { type: Schema.Types.ObjectId },
  invoiceNo: { type: Number },
  amount: { type: Number },
  description: { type: String },
  taxPercent: { type: Number },
  sgst: { type: Number },
  cgst: { type: Number },
  totaltax: { type: Number },
  terms: { type: String },
  transactionId: { type: Schema.Types.ObjectId},
  date: { type: Date },
  paid: { type: Boolean, default: false },
  paymentDate: { type: Date }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
