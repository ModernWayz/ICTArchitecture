const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { v4: uuidv4 } = require('uuid');
const convertapi = require('convertapi')('n2QH0QA4agOZTghF');

app.use(bodyParser.json());
const multiparty = require('multiparty');
const port = 3000;

const upload = require("./upload.js");
const security = require("./security.js");
let sub = "test";
let JWT = "";
let RefreshToken = "";

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/signup", async (req, res) => {
  const urlArray = ['https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
    'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg']
  convertapi.convert('gif', {
    Files: urlArray
  }, 'png').then(function(result) {
   console.log(result.response);
  });
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
      res.send("images uploaded")
    })
  }
  else {
        res.send("session expired, relog please")
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
