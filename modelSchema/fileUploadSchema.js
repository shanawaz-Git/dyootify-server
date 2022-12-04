const mongoose = require("mongoose");

const schema = mongoose.Schema;

const fileSchema = new schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    driveId: {
      type: String,
      required: true,
    },
    driveLink: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    fileSize: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("fileCollection", fileSchema);
