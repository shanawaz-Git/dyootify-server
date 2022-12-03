"use strict";
const fileUploadSchema = require("../modelSchema/fileUploadSchema");
const { auth } = require("../helpers/driveHelper");
const fs = require("fs");

const fileUpload = async (req, res, next) => {
  try {
    const { body, files } = req;
    const output = [];
    for (let f = 0; f < files.length; f += 1) {
      output.push(await uploadFile(auth, files[f], fileUploadSchema));
    }
    console.log(body);
    res.status(200).send(output);
  } catch (f) {
    res.send(f.message);
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
  const file = new schema({
    fileName: fileObject.originalname,
    driveId: data.id,
    fileType: fileObject.mimetype,
    fileSize: fileSizeFormatter(fileObject.size, 2),
  });
  file.save();
  return file;
}

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
