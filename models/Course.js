const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  courseName: { type: String },
  courseId: { type: String },
  description: { type: String },
  courseFee: { type: Number},
  academicYear: { type: String},
  instituteId: { type: String },
  schedule: {
    days: { type: [String] },
    startTime: { type: String },
    endTime: { type: String }
  },
  createdDate: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Course', CourseSchema);
