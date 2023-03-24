const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EMISchema = new Schema({
  emiId: { type: Schema.Types.ObjectId, ref: 'Loan' },
  dueDate: { type: Date },
  transactionId: { type: Schema.Types.ObjectId, ref: 'Loan' },
  installmentAmount: { type: Number },
  status: { type: Boolean }
});


module.exports = mongoose.model('EMI', EMISchema);
