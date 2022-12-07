require("./db/config");
const fileUploadSchema = require("./modelSchema/fileUploadSchema");
fileUploadSchema.find({}).then((ans) => {
  console.log(ans);
});
