const express = require("express");
const router = express.Router();
const signUpTemplateCopy = require("../models/SignUpModels");
const instituteTemplate = require("../models/InstituteModel");
const Student = require("../models/Student");
const Parent = require("../models/Parent");

const crypto = require("crypto");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
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
    studentId:request.body?.studentId,
    parentId: request.body?.parentId,
    dateOfBirth: request.body?.dateOfBirth,
    address: request.body?.address,
    enrolledCourses: request.body?.enrolledCourses,
    courseFee: request.body?.courseFee,
    tenure: request.body?.tenure,
    class:request.body?.class,
    status: request.body?.status
    // createdDate: { type: Date, default: Date.now },
  });
  // Student.AddStudent(newStudent,(response)=>{
  //   console.log(response)
  // })

  newStudent
    .save()
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      response.json(error);
    });
});

router.get("/institute", async (req, res) => {
  try {
    const institute = await instituteTemplate.find();
    res.status(200).json(institute);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.get("/getStudentInfo", async (req, res) => {
  try {
    const query = { phone: req.body?.phone };
    const result = await Student.findOne(query);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/getParentInfo", async (req, res) => {
  try {
    const query = { phone: req.body?.phone };
    const result = await Parent.findOne(query);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
