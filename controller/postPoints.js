const welcome = (req, res, next) => {
  console.log("hello");
  res.status(200).send("welcome to my endpoint");
};

module.exports = { welcome };
