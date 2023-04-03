const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  instituteStudentId: {type:String},
  email: { type: String },
  phone: { type: String },
  studenttype: { type: String },
  instituteId: { type:String },
  parentId: { type: String},
  studentId:{type:String},
  dateOfBirth: { type: Date },
  address: {type: String},
  courseFee: { type: String},
  tenure:{type:String},
  class:{type:String},
  status:{type:String},
  applicationNumber:{type:String},
  enrolledCourses:{type:String},
  createdDate: { type: Date, default: Date.now }
});

const Student = module.exports = mongoose.model('Student', StudentSchema);

