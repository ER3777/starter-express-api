const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoanPartnerSchema = new Schema({
  partnerName: { type: String },
  partnerId: { type: Schema.Types.ObjectId },
  eligibility: { type: String },
  bankdetailsId: { type: String },
  breId: { type: Schema.Types.ObjectId },
  interestRate: { type: Number },
  loanTerm: { type: Number },
  maximumLoanAmount: { type: Number },
  minimumCreditScore: { type: Number }
});


module.exports = mongoose.model('LoanPartner', LoanPartnerSchema);
