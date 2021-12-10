const express = require("express");
const router = express.Router();
const User = require("../models").User;
const Role = require("../models").Role;
const Permission = require("../models").Permission;
const passport = require("passport");
require("../config/passport")(passport);
const Helper = require("../utils/helper");
const helper = new Helper();

// Create a new User
router.post(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  function (req, res) {
    helper
      .checkPermission(req.user.role_id, "user_add")
      .then(rolePerm => {
        if (!req.body.role_id || !req.body.username || !req.body.password) {
          res.status(400).send({
            msg: "Please pass Role ID, username or password.",
          });
        } else {
          User.create({
            username: req.body.email,
            password: req.body.password,
            role_id: req.body.role_id,
          })
            .then(user => res.status(201).send(user))
            .catch(error => {
              console.log(error);
              res.status(400).send(error);
            });
        }
      })
      .catch(error => {
        res.status(403).send(error);
      });
  }
);
// Get List of Users
router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  function (req, res) {
    helper
      .checkPermission(req.user.role_id, "user_get_all")
      .then(rolePerm => {
        User.findAll({
          include: [
            {
              model: Role,
              include: [
                {
                  model: Permission,
                  as: "permissions",
                },
              ],
            },
          ],
        })
          .then(users => res.status(200).send(users))
          .catch(error => {
            res.status(400).send(error);
          });
      })
      .catch(error => {
        res.status(403).send(error);
      });
  }
);

module.exports = router;
