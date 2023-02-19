const { uploadFile, validateOTP } = require("../helpers/fileUploadController");
const fileUploadSchema = require("../modelSchema/fileUploadSchema");
const { auth } = require("../helpers/driveHelper");
const { language } = require("googleapis/build/src/apis/language");

const fileUpload = async (req, res, next) => {
  if (validateOTP(req.body.otp)) {
    try {
      const { files } = req;
      const language = req.body.lang;
      const category = req.body.cat;
      const output = [];
      for (let f = 0; f < files.length; f += 1) {
        output.push(
          await uploadFile(auth, files[f], fileUploadSchema, language, category)
        );
      }
      res.status(200).json(output);
    } catch (f) {
      res.send(f.message);
    }
  } else {
    res.status(401).json("incorrect OTP");
  }
};

const nodeSNOWPost = async (req, res, next) => {
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

module.exports = { fileUpload, nodeSNOWPost };
