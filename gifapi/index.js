const express = require("express");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.json());
const multiparty = require('multiparty');
const port = 3000;

const upload = require("./upload.js");
const security = require("./security.js");

let JWT = "";
let RefreshToken = "";

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/signup", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let response = await security.registerUser(email, password);
  res.send(response);
});

app.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  security.login(email, password).catch((err) => {console.error(err)}).then((e) => {
    JWT = e.accessToken.jwtToken;
    RefreshToken = e.refreshToken.token
    res.send(RefreshToken)
  });
});

app.post("/upload", async (req, res) => {
  const urlArray = [];
  const validation = await security.validateToken(JWT).catch((err) => err)
  if (validation === "Valid Token.") {
    let form = new multiparty.Form();
    form.parse(req, async (err, fields, files) => {
      for (const [key, value] of Object.entries(files)) {
        await upload.uploadFile(value[0].path, value[0].originalFilename).catch((err) => {res.send(err)})

        res.send("images uploaded")
      }
    })
  }
  else {
        res.send("refresh token flow implementeren ??")
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
