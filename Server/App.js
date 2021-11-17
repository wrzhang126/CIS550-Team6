var express = require("express");
var app = express();
const PORT = "8080";
app.get("/", function (req, res) {
  res.send("hello world");
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err.message);
  } else console.log("App running on port 8080");
});
