const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const convertapi = require('convertapi')('n2QH0QA4agOZTghF');

app.use(bodyParser.json());
const multiparty = require('multiparty');
const port = 3000;

const upload = require("./upload.js");
const security = require("./security.js");
const {EB} = require("./uploadEvent");
const https = require('https'); // or 'https' for https:// URLs
const fs = require('fs');

let JWT = "";
let RefreshToken = "";
let sub = "";

app.get("/", (req, res) => {
  download('https://v2.convertapi.com/d/2wbcmr9kbyhyglihlszkcbalm3z5g3ze/FAM%20banner%20o.gif', './',console.log('succ'))
  res.send('suc')
});

app.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const response = await security.registerUser(email, password);
  res.send(response)
});

app.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  security.login(email, password).catch((err) => {console.error(err)}).then((e) => {
    JWT = e.accessToken.jwtToken;
    RefreshToken = e.refreshToken.token
    sub = e.idToken.payload.sub
    res.send(sub)
  });
});

app.post("/upload", async (req, res) => {
  const urlArray = [];
  const validation = await security.validateToken(JWT).catch((err) => err)
  if (validation === "Valid Token.") {
    let form = new multiparty.Form();
    form.parse(req, async (err, fields, files) => {
      for (const [key, value] of Object.entries(files)) {
        await upload.uploadFile(value[0].path, value[0].originalFilename, sub).catch((err) => {res.send(err)})
      }
      res.send(EB(sub))
    })
  }
  else {
        res.send("session expired, relog please")
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
