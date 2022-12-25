const { uploadFile, validateOTP } = require("../helpers/fileUploadController");
const fileUploadSchema = require("../modelSchema/fileUploadSchema");
const { auth } = require("../helpers/driveHelper");
const { language } = require("googleapis/build/src/apis/language");

const fileUpload = async (req, res, next) => {
  if (validateOTP(req.body.otp)) {
    try {
      const { files } = req;
      const language = req.body.lang;
      const output = [];
      for (let f = 0; f < files.length; f += 1) {
        output.push(
          await uploadFile(auth, files[f], fileUploadSchema, language)
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

module.exports = { fileUpload };
