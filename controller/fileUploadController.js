"use strict";

const fileUploadSchema = require("../modelSchema/fileUploadSchema");
const { auth } = require("../helpers/driveHelper");
const jsmediatags = require("jsmediatags");

const fileUpload = async (req, res, next) => {
  if (validateOTP(req.body.otp)) {
    try {
      const { body, files } = req;
      const output = [];
      for (let f = 0; f < files.length; f += 1) {
        output.push(await uploadFile(auth, files[f], fileUploadSchema));
      }
      console.log(output);
      res.status(200).send(output);
    } catch (f) {
      res.send(f.message);
    }
  } else {
    res.status(401).send("incorrect otp");
  }
};

async function uploadFile(auth, fileObject, schema) {
  const stream = require("stream");
  const { google } = require("googleapis");
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  const { data } = await google.drive({ version: "v3", auth }).files.create({
    media: {
      mimeType: fileObject.mimeType,
      body: bufferStream,
    },
    requestBody: {
      name: fileObject.originalname,
      parents: ["1VjUyCf_PxELdzaCL_Qz1RGkxDWN8I_oF"],
    },
    fields: "id,name",
  });
  let musicData = await awaitableJsmediatags(fileObject.buffer);

  const file = new schema({
    fileName: fileObject.originalname,
    fileTitle: musicData.tags.title,
    fileAlbum: musicData.tags.album,
    fileArtist: musicData.tags.artist,
    filePerformer: musicData.tags.TPE1.data,
    driveId: data.id,
    driveLink: "https://drive.google.com/uc?export=download&id=" + data.id,
    fileType: fileObject.mimetype,
    fileSize: fileSizeFormatter(fileObject.size, 2),
  });
  file.save();
  return file;
}

function awaitableJsmediatags(filename) {
  return new Promise(function (resolve, reject) {
    jsmediatags.read(filename, {
      onSuccess: function (tag) {
        resolve(tag);
      },
      onError: function (error) {
        reject(error);
      },
    });
  });
}

const validateOTP = (otp) => {
  const currentTime = new Date();
  const offset = new Date().getTimezoneOffset();
  const ISTOffset = 330;
  const ISTTime = new Date(
    currentTime.getTime() + (ISTOffset + offset) * 60000
  );
  var dateIST = ISTTime.getDate();
  var monthIST = ISTTime.getMonth() + 1;
  var hoursIST = ISTTime.getHours();
  var minutesIST = ISTTime.getMinutes();
  if (minutesIST > 0 && minutesIST <= 15)
    var value = hoursIST * 12 * dateIST * monthIST;
  else if (minutesIST > 15 && minutesIST <= 30)
    var value = hoursIST * 23 * dateIST * monthIST;
  else if (minutesIST > 30 && minutesIST <= 45)
    var value = hoursIST * 34 * dateIST * monthIST;
  else var value = hoursIST * 45 * dateIST * monthIST;
  if (otp == value) return true;
  return false;
};

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const size = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + size[index]
  );
};

module.exports = { fileUpload };
