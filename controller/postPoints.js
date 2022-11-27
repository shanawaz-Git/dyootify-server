const basicInfo = require("../modelSchema/basicInfo");
exports.upload = (req, res) => {
  const details = new basicInfo({
    name: req.body.name.toLowerCase(),
    email: req.body.email,
    age: req.body.age,
  });
  basicInfo.find({ name: req.body.name.toLowerCase() }, function (err, docs) {
    if (docs.length) {
      var data = JSON.stringify(docs);
      res.send("user already exist\n" + data).status(403);
    } else {
      const result = details
        .save()
        .then(() => {
          res.send("Saved to basicInfos DB").status(200);
        })
        .catch((err) => {
          res.send("error while saving to DB\n", err);
        });
    }
  });
};
