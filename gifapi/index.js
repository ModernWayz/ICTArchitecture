const express = require("express");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.json());
const multiparty = require('multiparty');
const port = 3000;

const upload = require("./upload.js");
const security = require("./security.js");

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
  security.login(email, password).then((e) => res.send(e));
});

app.post("/upload", async (req, res) => {
  const urlArray = [];
  let form = new multiparty.Form();
  form.parse(req, async (err, fields, files) => {
    for(const[key, value] of Object.entries(files)) {
      let url = await upload.uploadFile(value[0].path, value[0].originalFilename)
      console.log(url)
    }
  })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
