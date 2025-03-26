const express = require("express");
const fileController = require("../controllers/fileController");

const router = express.Router();


router.get("/download", fileController.downloadFile);

module.exports = router;