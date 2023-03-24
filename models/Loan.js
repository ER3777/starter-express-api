const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoanSchema = new Schema({
  loanPartner: { type: Schema.Types.ObjectId, ref: 'LoanPartner' },
  borrower: { type: Schema.Types.ObjectId, ref: 'Borrower' },
  loanAmount: { type: Number },
  interestRate: { type: Number },
  loanTerm: { type: Number },
  monthlyPayment: { type: Number },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date }
});

module.exports = mongoose.model('Loan', LoanSchema);
