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

const nodeSNOW = async (req, res, next) => {
  try {
    res.status(200).send(req.body.data + "\ntesting");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { fileUpload, nodeSNOW };
