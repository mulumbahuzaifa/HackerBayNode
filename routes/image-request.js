var express = require("express");
const https = require("https");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const Stream = require("stream").Transform;
const sharp = require("sharp");
var fs = require("fs");
var im = require("imagemagick");
const gm = require("gm");
const resizer = require("node-image-resizer");
var router = express.Router();
// var word = require("../Json/word.json");
var data = fs.readFileSync("./Json/word.json");
var words = JSON.parse(data);
/* GET home page. */

const setup = {
  all: {
    path: "./routes/resizedImages/",
    quality: 80,
  },
  versions: [
    {
      quality: 100,
      prefix: "small_",
      width: 50,
      height: 50,
    },
  ],
};
router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  function (req, resp, next) {
    https
      .get(
        "https://api.nasa.gov/planetary/apod?api_key=kkpX3oacplwgRWhGgS8djb4mdTWnAeLoSFZA04Xe",
        resp => {
          let data = "";

          // A chunk of data has been recieved.
          resp.on("data", chunk => {
            data += chunk;
          });

          // The whole response has been received. Print out the result.
          resp.on("end", () => {
            let url = JSON.parse(data).hdurl;
            //   console.log(url);

            https.get(url, res => {
              //the response should be  an image
              // console.log(res.headers);
              // console.log(
              //   res.headers["content-type"],
              //   res.headers["content-length"]
              // );

              if (res.statusCode == 200) {
                let img = new Stream();
                res.on("data", chunk => {
                  img.push(chunk);
                });

                res.on("end", () => {
                  var randomChars =
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                  var result = "";
                  for (var i = 0; i < randomChars.length; i++) {
                    result += randomChars.charAt(
                      Math.floor(Math.random() * randomChars.length)
                    );
                  }
                  let filename = __dirname + "\\images\\" + result + ".jpg";
                  // let filename = __dirname + "\\images\\apod.jpg";
                  // console.log(filename);
                  // const metadata = sharp(filename).metadata();
                  fs.writeFileSync(filename, img.read());

                  resizer(filename, setup);
                  // (async () => {
                  //   await
                  // })();

                  // fs.readFile("apod.jpg", async (err, data) => {
                  //   const outputBuffer = await sharp(data)
                  //     .resize({ width: 50, height: 50 })
                  //     .toBuffer();
                  //   fs.writeFile(
                  //     __dirname + "\\resizedImages\\" + result + ".jpg",
                  //     outputBuffer,
                  //     () => {
                  //       console.log("Image size Successfull");
                  //     }
                  //   );
                  // });
                  // console.log(metadata);
                });
              }
            });
          });
        }
      )
      .on("error", err => {
        console.log("Error: " + err.message);
      });
  }
);

module.exports = router;
