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
    if (!req.headers.language || req.headers.language == "all") {
      fileUploadSchema.find({}).then((ans) => {
        res.status(200).send(ans);
      });
    } else {
      fileUploadSchema.find({ language: req.headers.language }).then((ans) => {
        res.status(200).send(ans);
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const nodeSNOW = async (req, res, next) => {
  try {
    var question = req.body.question;
    if (!question) {
      question = "write a quote";
    }
    var request = require("request");
    var options = {
      url: "https://dev139590.service-now.com/api/808481/nodesnowai/question",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      json: true,
      body: {
        question: question,
      },
    };
    function callback(error, response, body) {
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(200).send(body.result.data);
      }
    }
    request(options, callback);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { open, getSongs, nodeSNOW };
