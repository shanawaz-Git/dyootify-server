"use Strict";
var path = require("path");
const open = (req, res, next) => {
  try {
    res.status(200).sendFile(path.join(__dirname, "../response.html"));
  } catch (error) {
    res.status(400).send(error.message);
  }
};
module.exports = { open };
