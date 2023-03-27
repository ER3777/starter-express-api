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
  dateOfBirth: { type: Date },
  address: {type: String},
  courseFee: { type: Number},
  tenure:{type:String},
  class:{type:String},
  enrolledCourses:{type:String},
  createdDate: { type: Date, default: Date.now }
});

const Student = module.exports = mongoose.model('Student', StudentSchema);

module.exports.getUserById = function (id, callback) {
  const query = { _id: id }
  Student.findById(query, callback);
}

module.exports.getStudents = function (callback) {
  Student.find(callback);
}

module.exports.AddStudent = function (newStudent,callback) {
  newStudent.save();
  console.log(callback)
}
