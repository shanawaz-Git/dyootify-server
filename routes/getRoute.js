"use Strict";
const express = require("express");
const { open } = require("../controller/getPoints");
const getRoute = express.Router();
getRoute.get("/", open);
module.exports = { routes: getRoute };
