const express = require("express");
const router = express.Router();

const upload = require("../../config/upload");
const singleUpload = upload.single("image");

router.post("/image-upload", (req, res) => {
  singleUpload(req, res, err => {
    if (err) {
      return res.status(422).send({ errors: "could not upload!" });
    }
    return res.status(200).json({ imageUrl: req.file.location });
  });
});

module.exports = router;
