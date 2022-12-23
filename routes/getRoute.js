"use Strict";
const express = require("express");
const { open, getSongs } = require("../controller/getPoints");
const getRoute = express.Router();
getRoute.get("/", open);
getRoute.get("/getsongs", getSongs);
module.exports = { routes: getRoute };
