const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RewardsSchema = new Schema({
  rewardId: [{ type: Schema.Types.ObjectId }],
  rewardType: { type: String },
  validity: { type: Date },
  reward: { type: String },
  brandId: [{ type: Schema.Types.ObjectId }]
});

module.exports = mongoose.model('Rewards', RewardsSchema);
