"use Strict";
const express = require("express");
const { open, welcome, getSongs } = require("../controller/getPoints");
const getRoute = express.Router();
getRoute.get("/", open);
getRoute.get("/welcome", welcome);
getRoute.get("/getsongs", getSongs);
module.exports = { routes: getRoute };
