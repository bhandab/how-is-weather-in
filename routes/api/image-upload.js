const express = require("express");
const router = express.Router();

const upload = require("../../config/upload");
const db = require("../../config/dbconnection");
const singleUpload = upload.single("image");

router.post("/image-upload", (req, res) => {
  singleUpload(req, res, err => {
    if (err) {
      return res.status(422).send({ errors: "could not upload!" });
    }
    if (!req.body.weatherDescription) {
      req.body.weatherDescription = "";
    }

    let lat = parseFloat(req.body.latitude);
    let long = parseFloat(req.body.longitude);
    let sql =
      "SELECT * FROM WEATHER_INFORMATION WHERE latitude=" +
      db.escape(lat) +
      " AND longitude=" +
      db.escape(long);

    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (result.length <= 0) {
        sql =
          "INSERT INTO WEATHER_INFORMATION (latitude, longitude, imageLink, weatherDescription) VALUES (" +
          db.escape(lat) +
          "," +
          db.escape(long) +
          "," +
          db.escape(req.file.location) +
          "," +
          db.escape(req.body.weatherDescription) +
          ")";
        db.query(sql, (err, result) => {
          if (err) {
            return res.status(500).json(err);
          }
          return res.status(200).json({ imageUrl: req.file.location });
        });
      } else {
        sql =
          "UPDATE WEATHER_INFORMATION SET imageLink=" +
          db.escape(req.file.location) +
          ",weatherDescription=" +
          db.escape(req.body.weatherDescription) +
          " WHERE latitude=" +
          db.escape(lat) +
          " AND longitude=" +
          db.escape(long);

        db.query(sql, (err, result) => {
          if (err) {
            return res.status(500).json(err);
          }
          return res.status(200).json({ imageUrl: req.file.location });
        });
      }
    });
  });
});

router.get("/information/:latitude/:longitude", (req, res) => {
  let latitude = parseFloat(req.params.latitude);
  let longitude = parseFloat(req.params.longitude);

  let sql =
    "SELECT * FROM WEATHER_INFORMATION WHERE latitude=" +
    db.escape(latitude) +
    " AND longitude=" +
    db.escape(longitude);

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    } else if (result.length <= 0) {
      return res
        .status(404)
        .json({
          error:
            "Either the location information is not found or weather information on that location is not found"
        });
    }
    result.forEach(row => {
      weatherInfo = {
        imageLink: row.imageLink,
        weatherDescription: row.weatherDescription
      };
    });
    res.status(200).json({ weatherInfo });
  });
});

module.exports = router;
