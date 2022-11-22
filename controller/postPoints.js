const basicInfo = require("../modelSchema/basicInfo");
exports.upload = (req, res) => {
  const details = new basicInfo({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
  });
  const result = details
    .save()
    .then(() => {
      res.send("Saved to basicInfos DB").status(200);
    })
    .catch((err) => {
      res.send("error while saving to DB\n", err);
    });
};
