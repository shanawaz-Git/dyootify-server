"use Strict";
const fileUploadSchema = require("../modelSchema/fileUploadSchema");
var path = require("path");
const open = (req, res, next) => {
  try {
    res.status(200).sendFile(path.join(__dirname, "../response.html"));
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getSongs = (req, res, next) => {
  try {
    if (req.body.language == "all") {
      fileUploadSchema.find({}).then((ans) => {
        res.status(200).send(ans);
      });
    } else {
      fileUploadSchema.find({ language: req.body.language }).then((ans) => {
        res.status(200).send(ans);
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
module.exports = { open, getSongs };
