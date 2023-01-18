// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({optionsSuccessStatus: 200})); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: "hello API"});
});

app.get("/api/:date", function (req, res) {
  if (isNaN(req.params.date)) {
    if (/(\d{4})-(\d{1,2})-(\d{1,2})$/.test(req.params.date)) {
      const unixTimestamp = Date.parse(req.params.date);
      const utcTimestamp = new Date(req.params.date).toUTCString();
      res.json({unix: unixTimestamp, utc: utcTimestamp});
    } else {
      res.json({error: "Invalid Date"});
    }
  } else {
    const unixTimestamp = req.params.date;
    const utcTimestamp = new Date(req.params.date * 1000).toLocaleDateString(
      "en-US"
    );
    res.json({unix: unixTimestamp, utc: utcTimestamp});
  }
});

app.get("/api", function (req, res) {
  res.json({unix: Date.now().toString(), utc: new Date().toUTCString()});
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log("Your app is listening on port 3000");
});
