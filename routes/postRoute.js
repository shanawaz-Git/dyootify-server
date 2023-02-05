"use strict";
const express = require("express");
const { fileUpload, nodeSNOW } = require("../controller/postPoints");
const multer = require("multer");
const postRoute = express.Router();
const upload = multer();
postRoute.post("/fileUpload", upload.any(), fileUpload);
postRoute.post("/SNOW", nodeSNOW);
module.exports = { routes: postRoute };
