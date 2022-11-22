const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const postRoute = require("./routes/postRoute");
const getRoute = require("./routes/getRoute");
require("./db/config");
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
app.use("/post", postRoute);
app.use("/get", getRoute);

app.listen(PORT, () => {
  console.log(`the server is running in localhost:${PORT}`);
});
