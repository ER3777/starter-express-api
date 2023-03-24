const express = require("express");
const router = express.Router();
const signUpTemplateCopy = require("../models/SignUpModels");
const instituteTemplate = require("../models/InstituteModel");
const studentModel = require("../models/Student");
const crypto = require("crypto");
const axios = require("axios");
const Student = require("../models/Student");
require("dotenv").config();
// test signup api
router.post("/signup", (request, response) => {
  const signedUpUser = new signUpTemplateCopy({
    fullName: request.body.fullName,
    username: request.body.username,
    email: request.body.email,
    password: request.body.password,
  });
  signedUpUser
    .save()
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      response.json(error);
    });

  //response.send('send')
});

// router.get('/hello',(request,response)=>{
//    response.json("success")

// })

router.post("/saveData", async (req, res) => {
  if (req.body.contact) {
    try {
      const contact = req.body.contact;
      const apiUrl = `https://staging.allcloud.in/apiv2prekshaedutech/api/Customer/SaveCustomerData`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: process.env.ALLCLOUD_URI,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).send("Something went wrong");
    }
  } else {
    res.status(500).send("Contact is missing");
  }
});

router.get("/getUserInfoByPhone", async (req, res) => {
  if (req.body.contact) {
    try {
      const contact = req.body.contact;
      const apiUrl = `https://staging.allcloud.in/apiv2prekshaedutech/api/Customer/SaveCustomerData`;
      const response = await axios.post(apiUrl, {
        headers: {
          Authorization: process.env.ALLCLOUD_URI,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).send("Something went wrong");
    }
  } else {
    res.status(500).send("Contact is missing");
  }
});



// add student

router.post("/addStudent", (request, response) => {
  const student = new studentModel({
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
  console.log(student)
  student
    .save()
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      response.json(error);
    });
});


router.get("/students", async (req, res) => {
  try {
    const institute = await StudentSchema.find();
    res.json(Student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/institute", async (req, res) => {
  try {
    const institute = await instituteTemplate.find();
    res.json(institute);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/test", async (req, res) => {
  const headers = {
    appid: "4d53bce03ec34c0a911182d4c228ee6c",
    secrettoken: "8b65e217-2df4-45da-a4af-46266f757257",
    usertoken: "bf3bf0aa-59c6-4f32-a72e-bfae5028d174",
    type: "GET",
    url: "https://staging.allcloud.in/apiv2prekshaedutech/api/Customer/GetCustomerSearch?Contact=8686889337",
  };
  var body = JSON.stringify(req.headers);
  console.log(body);
  const authToken = await GenerateHMACToken(
    headers.appid,
    headers.secrettoken,
    headers.usertoken,
    "GET",
    body
  );
  console.log("authToken", authToken);
  // let message = 'hello';
  // const hmac = crypto.createHmac('sha256', authToken);
  // hmac.update(message);

  // const digest = hmac.digest('hex');

  // console.log(digest);
  res.status(200).send("GET request successful");
});

// exports.handler = async (event) => {
//     const promise = new Promise(function(resolve, reject) {

//         var AppId=event.headers.appid;
//         var SecKey=event.headers.secrettoken;
//         var UserToken=event.headers.usertoken;
//         var Method="POST";
//         var URL=event.headers.url;
//         var body=JSON.stringify(event.body);

//        if(body === JSON.stringify({}))
//        {
//            Method="GET";
//            body="";
//        }

//        var authToken = GenerateHMACToken(AppId,SecKey,UserToken,Method,URL,body);
//             resolve(authToken);

//     });
//     return promise;
// };

function GenerateHMACToken(APPId, Seckey, UserToken, Method, URL, input) {
  console.log(APPId, Seckey, UserToken, Method, URL, input);
  var requestUri = encodeURIComponent(URL).toLowerCase();
  var nonce = randomString();
  var epochStart = new Date("01-01-" + new Date().getFullYear() + " 00:00:00");
  var utcNow = new Date(new Date().toUTCString());
  var diffTime = utcNow - epochStart;
  var requestTimeStamp = Math.abs(diffTime / 1000);
  var buf = Buffer.from(URL, "utf8");
  var requestContentBase64String = crypto
    .createHash("md5")
    .update(buf)
    .digest("base64");
  if (input == "") {
    requestContentBase64String = "";
  }

  var requestdata =
    APPId +
    Method +
    requestUri +
    requestTimeStamp +
    nonce +
    requestContentBase64String;

  console.log(requestdata);

  var token = crypto
    .createHmac("sha256", Seckey)
    .update(requestdata, "utf8")
    .digest("base64");

  var AuthToken =
    "amx " +
    APPId +
    ":" +
    token +
    ":" +
    nonce +
    ":" +
    requestTimeStamp +
    ":" +
    UserToken;
  return AuthToken;
}

function randomString() {
  var length = 32;
  var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

module.exports = router;
