const mongoose = require("mongoose");

const uri =
  "mongodb+srv://dyootifyUser:eS4K6Dxhj7kHwQ3U@dyootify.sazizca.mongodb.net/?retryWrites=true&w=majority";

console.log("------------------------------------");
console.log("---(*_*)CONNECTING TO MONGO(*_*)---");
console.log("------------------------------------");

mongoose.connect(uri);

mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});

mongoose.connection.on("open", () => {
  console.log("connection open to mongo");
  console.log("------------------------------------");
});

mongoose.connection.on("disconnected", () => {
  console.log("disconnected from mongo");
  console.log("------------------------------------");
});

mongoose.connection.on("close", () => {
  console.log("connection closed from mongo");
  console.log("------------------------------------");
});

mongoose.connection.on("error", (err) => {
  console.log("ERROR FOUND:\n", err);
  console.log("------------------------------------");
});
