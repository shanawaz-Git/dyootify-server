const mongoose = require("mongoose");

const schema = mongoose.Schema;

const fileSchema = new schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    fileTitle: {
      type: String,
    },
    fileAlbum: {
      type: String,
    },
    fileArtist: {
      type: String,
    },
    filePerformer: {
      type: String,
    },
    language: {
      type: String,
    },
    category: {
      type: String,
    },
    driveId: {
      type: String,
      required: true,
    },
    driveLink: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
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
