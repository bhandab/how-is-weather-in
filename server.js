const express = require("express");
const bodyParser = require("body-parser");

const uploadRouter = require("./routes/api/image-upload");
const db = require("./config/dbconnection");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.use("/api/file-upload", uploadRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log("Server listening to port ", port);
});
