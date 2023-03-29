const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  applicationId: { type: Schema.Types.ObjectId },
  parentId: { type: Schema.Types.ObjectId },
  studentId:{type: Schema.Types.ObjectId},
  status: { type: Object },
  state:{type:Object},
  reason:{type:String},
  creditsOfScore: { type: Number }
});

module.exports = mongoose.model('Application', ApplicationSchema);
