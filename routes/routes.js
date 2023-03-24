const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const axios = require("axios");
require("dotenv").config();

router.get("/test", async (req, res) => {
  const headers = {
    appid: "4d53bce03ec34c0a911182d4c228ee6c",
    usertoken: "8b65e217-2df4-45da-a4af-46266f757257",
    secrettoken: "5d90c1e4-7002-47cf-9524-6768c9bc1cb0",
    
    type: "GET",
    url: "https://staging.allcloud.in/apiv2prekshaedutech/api/Customer/GetCustomerSearch?Contact=8686889337",
  };
  var body = JSON.stringify(req.headers);
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
    const apiUrl = 'https://staging.allcloud.in/apiv2prekshaedutech/api/Customer/GetCustomerSearch?Contact=8686889337';
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json",
      },
    });
    res.json(response.data);
  } catch (error) {
 // console.error(error);
    res.status(500).send("Something went wrong");
  }
 
});



function GenerateHMACToken(APPId, Seckey, UserToken, Method, URL, input) {
 
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
    "";

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
