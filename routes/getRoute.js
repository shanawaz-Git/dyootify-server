"use Strict";
const express = require("express");
const { open, welcome } = require("../controller/getPoints");
const getRoute = express.Router();
getRoute.get("/", open);
getRoute.get("/welcome", welcome);
module.exports = { routes: getRoute };
