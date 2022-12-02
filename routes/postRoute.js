"use strict";
const express = require("express");
const { upload } = require("../helpers/fileHelper");
const { fileUpload, welcome } = require("../controller/fileUploadController");
const postRoute = express.Router();

postRoute.post("/fileUpload", fileUpload);
postRoute.post("/hello", welcome);
module.exports = { routes: postRoute };
