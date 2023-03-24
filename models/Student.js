const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  instituteStudentId: [{ type: String}],
  email: { type: String },
  phone: { type: Number },
  studenttype: { type: String },
  instituteId: [{ type: String}],
  parentId: [{ type: String}],
  dateOfBirth: { type: Date },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String }
  },
  enrolledCourses: [{ type: String}],
  createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', StudentSchema);
