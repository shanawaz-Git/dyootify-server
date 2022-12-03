"use strict";
const express = require("express");
const { upload } = require("../helpers/fileHelper");
const { fileUpload } = require("../controller/fileUploadController");
const { welcome } = require("../controller/postPoints");
const postRoute = express.Router();

postRoute.post("/fileUpload", upload.array("files"), fileUpload);
postRoute.post("/hello", welcome);
module.exports = { routes: postRoute };
