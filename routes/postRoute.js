"use strict";
const express = require("express");
const { upload } = require("../helpers/fileHelper");
const { singleFileUpload } = require("../controller/fileUploadController");
const postRoute = express.Router();

postRoute.post("/singleFileUpload", upload.single("file"), singleFileUpload);
module.exports = { routes: postRoute };
