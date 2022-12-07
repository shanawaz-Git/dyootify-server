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

const welcome = (req, res, next) => {
  try {
    res.status(200).send("hello");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getSongs = (req, res, next) => {
  try {
    fileUploadSchema.find({}).then((ans) => {
      res.status(200).send(ans);
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
module.exports = { open, welcome, getSongs };
