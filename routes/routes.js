const express = require("express");
const router = express.Router();
const signUpTemplateCopy = require("../models/SignUpModels");
const instituteTemplate = require("../models/InstituteModel");
const Student = require("../models/Student");
const Parent = require("../models/Parent");
const Application = require("../models/Application");


const crypto = require("crypto");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

// add student api

router.post("/addStudent", (req, res) => {
  const newStudent = new Student({
    firstName: res.body?.firstName,
    lastName: res.body?.lastName,
    instituteStudentId: res.body?.instituteStudentId,
    email: res.body?.email,
    phone: res.body?.phone,
    studenttype: res.body?.studenttype,
    instituteId: res.body?.instituteId,
    studentId:res.body?.studentId,
    parentId: res.body?.parentId,
    dateOfBirth: res.body?.dateOfBirth,
    address: res.body?.address,
    enrolledCourses: res.body?.enrolledCourses,
    courseFee: res.body?.courseFee,
    tenure: res.body?.tenure,
    class:res.body?.class,
    status: res.body?.status
    // createdDate: { type: Date, default: Date.now },
  });
  // Student.AddStudent(newStudent,(response)=>{
  //   console.log(response)
  // })

  newStudent
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json(error);
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



router.get("/getStudentInfo/:phone", async (req, res) => {
  try {
    const query = { phone: req.params?.phone };
    const result = await Student.findOne(query);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/getParentInfo/:phone", async (req, res) => {
  try {
    const query = { phone: req.params?.phone };
    const result = await Parent.findOne(query);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/applicationStatus/:id", async (req, res) => {
  try {
    const query = { _id: req.params?.id };
    const result = await Application.findOne(query);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
