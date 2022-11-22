const express = require("express");
const { upload } = require("../controller/postPoints");
const postRoute = express.Router();
postRoute.post("/upload", upload);
module.exports = postRoute;
