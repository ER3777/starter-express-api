const express = require("express");
const router = express.Router();
const signUpTemplateCopy = require("../models/SignUpModels");
const instituteTemplate = require("../models/InstituteModel");
const Student = require("../models/Student");
const crypto = require("crypto");
const axios = require("axios");
const { v4: uuidv4 } = require('uuid');
require("dotenv").config();


// add student api

router.post("/addStudent", (request, response) => {
  const newStudent = new Student({
    firstName: request.body?.firstName,
    lastName: request.body?.lastName,
    instituteStudentId: request.body?.instituteStudentId,
    email: request.body?.email,
    phone: request.body?.phone,
    studenttype: request.body?.studenttype,
    instituteId: request.body?.instituteId,
    parentId: request.body?.parentId,
    dateOfBirth: request.body?.dateOfBirth,
    address: {
      street: request.body?.street,
      city: request.body?.city,
      state: request.body?.state,
      zip: request.body?.zip,
    },
    enrolledCourses: request.body?.enrolledCourses,
    // createdDate: { type: Date, default: Date.now },
  })
  Student.AddStudent(newStudent,(response)=>{
    console.log(response)
  })
  
//   student
//     .save()
//     .then((data) => {
//       response.json(data);
//     })
//     .catch((error) => {
//       response.json(error);
//     });
});



router.get("/institute", async (req, res) => {
  try {
    const institute = await instituteTemplate.find();
    res.json(institute);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
