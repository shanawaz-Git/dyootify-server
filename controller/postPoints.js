const { uploadFile, validateOTP } = require("../helpers/fileUploadController");
const fileUploadSchema = require("../modelSchema/fileUploadSchema");
const { auth } = require("../helpers/driveHelper");

const fileUpload = async (req, res, next) => {
  if (validateOTP(req.body.otp)) {
    try {
      const { body, files } = req;
      const output = [];
      for (let f = 0; f < files.length; f += 1) {
        output.push(await uploadFile(auth, files[f], fileUploadSchema));
      }
      res.status(200).send(output);
    } catch (f) {
      res.send(f.message);
    }
  } else {
    res.status(401).send("incorrect otp");
  }
};

module.exports = { fileUpload };
