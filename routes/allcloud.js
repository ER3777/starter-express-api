const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const axios = require("axios");
const Parent = require("../models/Parent");

require("dotenv").config();

// allcloud GetCustomerSearch API
router.get("/getParentInfoByMobileNumber", async (req, res) => {
  const Contact = req.body.contact;
  // const Contact = "8686889337"
  const headers = {
    appid: process.env.APPID,
    usertoken: process.env.USERTOKEN,
    secrettoken: process.env.SECRETTOKEN,
    
    type: "GET",
    url: `https://staging.allcloud.in/apiv2prekshaedutech/api/Customer/GetCustomerSearch?Contact=${Contact}`,
  };
  var body = JSON.stringify(req.body);
 // console.log(body);
  const authToken = await GenerateHMACToken(
    headers.appid,
    headers.secrettoken,
    headers.usertoken,
    "GET",
    headers.url,
    body
  );
  //console.log("authToken", authToken);

  try {
    const apiUrl = `https://staging.allcloud.in/apiv2prekshaedutech/api/Customer/GetCustomerSearch?Contact=${Contact}`;
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json",
      },
    });
    res.json(response.data);
  } catch (error) {
 // console.error(error);
    res.status(500).send(error);
  }
 
});

// allcloud GetCustomerByCIFIdAsync API
router.get("/getParentInfoById/:Id", async (req, res) => {
  const ParentId = req.params.Id;
  //const Contact = "8686889337"
  const headers = {
    appid: process.env.APPID,
    usertoken: process.env.USERTOKEN,
    secrettoken: process.env.SECRETTOKEN,
    
    type: "GET",
    url: `https://staging.allcloud.in/apiv2prekshaedutech/api/Customer/GetCustomerByCIFIdAsync/${ParentId}`,
  };
  var body = JSON.stringify(req.body);
 // console.log(body);
  const authToken = await GenerateHMACToken(
    headers.appid,
    headers.secrettoken,
    headers.usertoken,
    "GET",
    headers.url,
    body
  );
  //console.log("authToken", authToken);

  try {
    const apiUrl = `https://staging.allcloud.in/apiv2prekshaedutech/api/Customer/GetCustomerByCIFIdAsync/${ParentId}`;
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json",
      },
    });
    res.json(response.data);
  } catch (error) {
 // console.error(error);
    res.status(500).send(error);
  }
 
});

// allcloud SaveCustomerData API --> Error handling and save 
router.post("/addParent", async (req, res) => {
  const ParentId = req.body.Id;
  const headers = {
    appid: process.env.APPID,
    usertoken: process.env.USERTOKEN,
    secrettoken: process.env.SECRETTOKEN,
    
    type: "POST",
    url: `https://staging.allcloud.in/apiv2prekshaedutech/api/Customer/SaveCustomerData`,
  };
  const ParentData = req.body
  var body = JSON.stringify(req.body);
  
  const authToken = await GenerateHMACToken(
    headers.appid,
    headers.secrettoken,
    headers.usertoken,
    "POST",
    headers.url,
    body
  );
 
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://staging.allcloud.in/apiv2prekshaedutech/api/Customer/SaveCustomerData',
    headers: { 
      'Authorization': authToken,
      'Content-Type': 'application/json'
    },data : body
  };
 
  await axios.request(config)
  .then((response) => {
    const newParent = new Parent({
      phone: req.body.ContactNumber,
      data: response.data
    })
    newParent
    .save()
    .then((data) => {
      res.status(200).send(data);
       
    })
    .catch((error) => {
      
      res.status(500).send(error)
    });
  })
  .catch((error) => {
   res.send(error)
  });
 
});

// allcloud POST /api/Customer/UpdateCustomerData
router.post("/updateParent", async (req, res) => {
  const headers = {
    appid: process.env.APPID,
    usertoken: process.env.USERTOKEN,
    secrettoken: process.env.SECRETTOKEN,
    type: "POST",
    url: `https://staging.allcloud.in/apiv2prekshaedutech/api/Customer/UpdateCustomerData`,
  };
  var body = JSON.stringify(req.body);
 // console.log(body);
  const authToken = await GenerateHMACToken(
    headers.appid,
    headers.secrettoken,
    headers.usertoken,
    "POST",
    headers.url,
    body
  );

  try {
    const apiUrl = `https://staging.allcloud.in/apiv2prekshaedutech/api/Customer/UpdateCustomerData`;
    const response = await axios.post(apiUrl, {
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json",
      } ,data : body
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// allcloud DeleteCustomer API
router.delete("/deleteParent",async (req,res) => {
  const headers = {
    appid: process.env.APPID,
    usertoken: process.env.USERTOKEN,
    secrettoken: process.env.SECRETTOKEN,
    type: "DELETE",
    url: `https://staging.allcloud.in/apiv2prekshaedutech/api/Customer/DeleteCustomer`,
  };
  var body = JSON.stringify(req.body);
 
  const authToken = await GenerateHMACToken(
    headers.appid,
    headers.secrettoken,
    headers.usertoken,
    "DELETE",
    headers.url,
    body
  );
 
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: 'https://staging.allcloud.in/apiv2prekshaedutech/api/Customer/DeleteCustomer',
    headers: { 
      'Authorization': authToken,
      'Content-Type': 'application/json'
    },data : body
  };
  
  axios.request(config)
  .then((response) => {
   res.status(200).send(JSON.stringify(response.data));
  })
  .catch((error) => {
   res.status(500).send(error)
  });
})

// allcloud CustomerSearchByKYCDetails API 
// server RESPONSE ERROR
router.post("/parentSearchByKyc",async (req,res) => {
  const headers = {
    appid: process.env.APPID,
    usertoken: process.env.USERTOKEN,
    secrettoken: process.env.SECRETTOKEN,
    type: "POST",
    url: `https://staging.allcloud.in/apiv2prekshaedutech/api/Customer/CustomerSearchByKYCDetails`,
  };
  var body = JSON.stringify(req.body);
 
  const authToken = await GenerateHMACToken(
    headers.appid,
    headers.secrettoken,
    headers.usertoken,
    "POST",
    headers.url,
    body
  );
 
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://staging.allcloud.in/apiv2prekshaedutech/api/Customer/CustomerSearchByKYCDetails',
    headers: { 
      'Authorization': authToken,
      'Content-Type': 'application/json'
    },data : body
  };
  
  axios.request(config)
  .then((response) => {
   res.status(200).send(JSON.stringify(response.data));
  })
  .catch((error) => {
   res.status(500).send(error)
  });
})

// POST GetCountryStateInfo API
router.post("/getStateInfo", async (req, res) => {
  const ParentId = req.body.Id;
  const headers = {
    appid: process.env.APPID,
    usertoken: process.env.USERTOKEN,
    secrettoken: process.env.SECRETTOKEN,
    
    type: "POST",
    url: `https://staging.allcloud.in/apiv2prekshaedutech/api/Customer/GetCountryStateInfo`,
  };
  var body = JSON.stringify(req.body);
 
  const authToken = await GenerateHMACToken(
    headers.appid,
    headers.secrettoken,
    headers.usertoken,
    "POST",
    headers.url,
    body
  );
 
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://staging.allcloud.in/apiv2prekshaedutech/api/Customer/GetCountryStateInfo',
    headers: { 
      'Authorization': authToken,
      'Content-Type': 'application/json'
    },data : body
  };
  
  axios.request(config)
  .then((response) => {
   res.status(200).send(JSON.stringify(response.data));
  })
  .catch((error) => {
   res.status(500).send(error)
  });
 
});

// allcloud GetDistrictTownInfo API
router.post("/getDistrictTownInfo", async (req, res) => {
  const ParentId = req.body.Id;
  const headers = {
    appid: process.env.APPID,
    usertoken: process.env.USERTOKEN,
    secrettoken: process.env.SECRETTOKEN,
    
    type: "POST",
    url: `https://staging.allcloud.in/apiv2prekshaedutech/api/Customer/GetDistrictTownInfo`,
  };
  var body = JSON.stringify(req.body);
 
  const authToken = await GenerateHMACToken(
    headers.appid,
    headers.secrettoken,
    headers.usertoken,
    "POST",
    headers.url,
    body
  );
 
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://staging.allcloud.in/apiv2prekshaedutech/api/Customer/GetDistrictTownInfo',
    headers: { 
      'Authorization': authToken,
      'Content-Type': 'application/json'
    },data : body
  };
  
  axios.request(config)
  .then((response) => {
   res.status(200).send(JSON.stringify(response.data));
  })
  .catch((error) => {
   res.status(500).send(error)
  });
 
});

//Save POST /api/Customer/SaveCorporateCustomerData pending 
// line 203 error response


function GenerateHMACToken(APPId, Seckey, UserToken, Method, URL, input) {
 
  var requestUri = encodeURIComponent(URL).toLowerCase();
  var nonce = randomString();  
  var epochStart = new Date("01-01-" + new Date().getFullYear() + " 00:00:00");
  var utcNow = new Date(new Date().toUTCString());
  var diffTime = utcNow - epochStart;
  var requestTimeStamp = Math.abs(diffTime / 1000);
  var buf = Buffer.from(input, "utf8");
  var requestContentBase64String = crypto
    .createHash("md5")
    .update(buf)
    .digest("base64");
  if (Method == "GET") {
    requestContentBase64String = "";
  }

  var requestdata =
    APPId +
    Method +
    requestUri +
    requestTimeStamp +
    nonce +
    requestContentBase64String;

  
console.log(requestdata)
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
