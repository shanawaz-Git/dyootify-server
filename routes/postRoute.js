"use strict";
const express = require("express");
const { upload } = require("../helpers/fileHelper");
const { fileUpload } = require("../controller/fileUploadController");
const postRoute = express.Router();

postRoute.post("/fileUpload", upload.array("files"), fileUpload);
module.exports = { routes: postRoute };
