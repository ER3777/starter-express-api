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

const jwt = require('jsonwebtoken');
const secretKey = '0ne-preksha-cloud';

// add student api

router.post("/addStudent", async (req, res) => {
   
  let newStudent = new Student({
    firstName: req.body?.firstName,
    lastName: req.body?.lastName,
    instituteStudentId: req.body?.instituteStudentId,
    email: req.body?.email,
    phone: req.body?.phone,
    studenttype: req.body?.studenttype,
    instituteId: req.body?.instituteId,
    studentId:req.body?.studentId,
    parentId: req.body?.parentId,
    dateOfBirth: req.body?.dateOfBirth,
    address: req.body?.address,
    enrolledCourses: req.body?.enrolledCourses,
    courseFee: req.body?.courseFee,
    tenure: req.body?.tenure,
    class:req.body?.class,
    status: req.body?.status
    // createdDate: { type: Date, default: Date.now },
  });
  await newStudent
    .save()
    .then((data) => {
      let newApplication = new Application({
        studentId:data._id,
        KYC:"pending",
      })
      newApplication.save().then((appData)=>{
        res.status(200).json(data); 
           })
      .catch((error)=>{
        res.status(500).json(error);
      })
    //  res.status(200).json(data);
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

// login 

router.get("/login/:phone", async (req, res) => {
  try {
    const query = { phone: req.params?.phone };
    const result = await Student.findOne(query);
    if(result == null){
      res.status(201).json("Phone number not found");
    }
    if(result){
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
