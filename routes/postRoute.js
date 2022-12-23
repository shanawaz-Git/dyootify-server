"use strict";
const express = require("express");
const { fileUpload } = require("../controller/postPoints");
const multer = require("multer");
const postRoute = express.Router();
const upload = multer();
postRoute.post("/fileUpload", upload.any(), fileUpload);
module.exports = { routes: postRoute };
