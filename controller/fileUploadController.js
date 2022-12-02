"use strict";
const fileUploadSchema = require("../modelSchema/fileUploadSchema");

const fileUpload = async (req, res, next) => {
  try {
    // await req.files.forEach((element) => {
    // const file = new fileUploadSchema({
    //   fileName: element.originalname,
    //   filePath: element.path,
    //   fileType: element.mimetype,
    //   fileSize: fileSizeFormatter(element.size, 2),
    // });
    const file = new fileUploadSchema({
      fileName: "shanawaz",
      filePath: "element.path",
      fileType: "element.mimetype",
      fileSize: "fileSizeFormatter(element.size, 2)",
    });
    file.save();
    console.log("working bro");
    // }
    // );
    res.status(201).send("File Uploaded Successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const welcome = (req, res, next) => {
  console.log("hello");
  res.status(200).send("welcome to my endpoint");
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

module.exports = { fileUpload, welcome };
