const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
const multiparty = require('multiparty');
const port = 3000;

const upload = require("./upload.js");
const security = require("./security.js");
const {EB} = require("./uploadEvent");

const {downloadGifs} = require("./download");

let JWT = "";
let RefreshToken = "";
let sub = "";

app.get("/", (req, res) => {
  res.send("hello world")
});

app.get("/myGifs", async (req, res) => {
  const validation = await security.validateToken(JWT).catch((err) => err)
  if (validation === "Valid Token.") {
    const gifs = await downloadGifs(sub)
    res.send(gifs)
  }
  else{
    res.send("session expired, please relog")
  }

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
    res.send('logged in !')
  });
});

app.post("/upload", async (req, res) => {
  const validation = await security.validateToken(JWT).catch((err) => err)
  if (validation === "Valid Token.") {
    let form = new multiparty.Form();
    form.parse(req, async (err, fields, files) => {
      for (const [key, value] of Object.entries(files)) {
        await upload.uploadFile(value[0].path, value[0].originalFilename, sub).catch((err) => {res.send(err)})
      }
      EB(sub)
      res.send('succesfully uploaded!')
    })
  }
  else {
        res.send("session expired, relog please")
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
