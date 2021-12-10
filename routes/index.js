var express = require("express");
var fs = require("fs");
var router = express.Router();
// var word = require("../Json/word.json");
var data = fs.readFileSync("./Json/word.json");
var words = JSON.parse(data);
/* GET home page. */
router.get("/", function (req, res, next) {
  console.log(words);
  res.render("index", { title: "Express" });
});

module.exports = router;
