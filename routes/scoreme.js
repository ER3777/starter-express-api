const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

// scoreme equifax

router.post("/EquifaxReport", async (req, res) => {
  
  if(req.body){
    let data = req.body
    // let data = JSON.stringify({
    //   "bureauName": [
    //     "equifax"
    //   ],
    //   "firstName": "mahendra",
    //   "middleName": "",
    //   "lastName": "kumar",
    //   "addressList": [
    //     {
    //       "address": "gayatri nagar, madhapur ,hyderabad",
    //       "state": "TG",
    //       "pinCode": "500018"
    //     }
    //   ],
    //   "mobileList": [
    //     "8686889337"
    //   ],
    //   "identityList": [
    //     "BFGPK1861P"
    //   ],
    //   "dateOfBirth": "1996-02-17",
    //   "gender": "M"
    // });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://sm-bda.scoreme.in/bda/external/retail',
      
      headers: { 
        'Content-Type': 'application/json', 
        'clientId': process.env.clientId, 
        'clientSecret': process.env.clientSecret
      },
      data : data
    };
    
   await axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      res.status(200).send(response.data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
  }
  else{
    res.status(500).send("Body should not empty");
  }
});

router.post("/EquifaxValidateOTP",async (req,res) => {
  let data = req.body;
  // let data = JSON.stringify({
  //   "referenceId": "382eb69d-113d-43cd-86ed-45a42327b695",
  //   "otp": "984674"
  // });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://sm-bda.scoreme.in/bda/external/validateotp',
    headers: { 
      'Content-Type': 'application/json', 
      'clientId': process.env.clientId, 
      'clientSecret': process.env.clientSecret
    },
    data : data
  };
  
  axios.request(config)
  .then((response) => {
    res.status(200).send(response.data);
  })
  .catch((error) => {
    res.status(500).send(error);
  });
})

router.post("/EquifaxResendOTP",async (req,res) => {
  let data = req.body;
  // let data = JSON.stringify({
  //   "referenceId": "382eb69d-113d-43cd-86ed-45a42327b695",
  //   "otp": "984674"
  // });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://sm-bda.scoreme.in/bda/external/resendotp',
    headers: { 
      'Content-Type': 'application/json', 
      'clientId': process.env.clientId, 
      'clientSecret': process.env.clientSecret
    },
    data : data
  };
  
  axios.request(config)
  .then((response) => {
    res.status(200).send(response.data);
  })
  .catch((error) => {
    res.status(500).send(error);
  });
})


router.get("/getGeneratedReport",async (req,res) => {
  let data = req.body;
  // let data = JSON.stringify({
  //   "referenceId": "382eb69d-113d-43cd-86ed-45a42327b695",
  //   "otp": "984674"
  // });
  
  let config = {
    method: 'get',
    url: 'https://sm-bda.scoreme.in/bda/external/getbdareport/?referenceId=fdc2a5f3-4fb0-48ac-b760-430744773c71',
    headers: { 
      'Content-Type': 'application/json', 
      'clientId': process.env.clientId, 
      'clientSecret': process.env.clientSecret
    }
  };
  
  axios.request(config)
  .then((response) => {
    res.status(200).send(response.data);
  })
  .catch((error) => {
    res.status(500).send(error);
  });
})



router.post("/panVerify",async (req,res) => {
  let data = req.body
  // let data = JSON.stringify({
  //   "panNumber": "DZEPK9657M",
  //   "fullName": "MAHENDRA KUMAR THANEERU",
  //   "status": "INDIVIDUAL",
  //   "dateOfBirth": "17-FEB-1995"
  // });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://sm-kyc.scoreme.in/kyc/external/panverification',
    headers: { 
      'Content-Type': 'application/json', 
      'clientId': process.env.clientId, 
      'clientSecret': process.env.clientSecret
    },
    data : data
  };
  
  axios.request(config)
  .then((response) => {
    res.json(response.data)
  })
  .catch((error) => {
    res.json("pan verification error")
  });
  
})


module.exports = router;
