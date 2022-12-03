const { google } = require("googleapis");
const path = require("path");
const KEYFILEPATH = "music-backend-project-370510-44db7f5fb1bc.json";
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const createAndUploadFiles = async (auth) => {
  const driveService = google.drive({ version: "v3", auth });
  let fileMetaData = {
    name: "icon.jpg",
    parents: "",
  };
};
const getParentID2 = async (auth) => {
  const drive = google.drive({
    version: "v3",
    auth,
  });
  drive.files.list({}, (err, res) => {
    if (err) throw err;
    const files = res.data.files;
    if (files.length) {
      files.map((file) => {
        console.log(file);
      });
    } else {
      console.log("No files found");
    }
  });
  //-------------
  //   drive.files
  //     .list({
  //       q: "mimeType='image/jpeg'",
  //       fields: "nextPageToken, files(id, name)",
  //       spaces: "drive",
  //     })
  //     .then((res) => {
  //       const fileId = res.data.files[0].id;
  //       console.log("File ID : ", fileId);

  //       drive.files
  //         .get({
  //           fileId: fileId,
  //           fields: "parents",
  //         })
  //         .then((res) => {
  //           console.log("Parent folder ID :", res.data.parents[0]);
  //         });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //---------
  //   const drive = google.drive({ version: "v3", auth });
  //   const res = await drive.files.list({
  //     q: "mimeType='image/jpg'",
  //     fields: "nextPageToken, files(id, name)",
  //     spaces: "drive",
  //   });
  //   const files = res.data.files;
  //   if (files.length === 0) {
  //     console.log(res.data.parents);
  //     console.log("No files found.");
  //     return;
  //   }

  //   console.log("Files:");
  //   files.map((file) => {
  //     console.log(`${file.name} (${file.id})`);
  //   });
};
function uploadFile(auth) {
  const drive = google.drive({ version: "v3", auth });
  const fileMetadata = {
    name: "photo.jpg",
  };
  const media = {
    mimeType: "image/jpeg",
    body: fs.createReadStream("files/photo.jpg"),
  };
  drive.files.create(
    {
      resource: fileMetadata,
      media: media,
      fields: "id",
    },
    (err, file) => {
      if (err) {
        // Handle error
        console.error(err);
      } else {
        console.log("File Id: ", file.id);
      }
    }
  );
}
// getParentID2(auth);
module.exports = { auth };
