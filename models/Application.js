const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  applicationId: { type: Schema.Types.ObjectId },
  parentId: { type: Schema.Types.ObjectId },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  creditsOfScore: { type: Number }
});


module.exports = mongoose.model('Application', ApplicationSchema);
