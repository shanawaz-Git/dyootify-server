"use Strict";
const express = require("express");
const { open, getSongs, nodeSNOW } = require("../controller/getPoints");
const getRoute = express.Router();
getRoute.get("/", open);
getRoute.get("/getsongs", getSongs);
getRoute.get("/SNOW", nodeSNOW);
module.exports = { routes: getRoute };
