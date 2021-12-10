const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();
var rfc6902 = require("rfc6902");
var fs = require("fs");
// var word = require("../Json/word.json");
var data = fs.readFileSync("./Json/word.json");
var words = JSON.parse(data);

router.post(
  "/add",
  passport.authenticate("jwt", {
    session: false,
  }),
  function (req, res) {
    var data = req.body;
    var word = data.word;
    var score = Number(data.score);
    var reply;
    if (!score) {
      reply = {
        message: "Score is required.",
      };
    } else {
      words[word] = score;
      var data = JSON.stringify(words, null, 2);
      fs.writeFile("./Json/word.json", data, finished);
      function finished(err) {
        console.log("all-set");
      }
      reply = {
        word: word,
        score: score,
      };
    }
    res.send(words);
  }
);

router.post("/update", function (req, res) {});

module.exports = router;
