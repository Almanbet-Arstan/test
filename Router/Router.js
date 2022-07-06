const express = require("express");
const FileController = require("../Controller/FileController");
const router = express.Router();
const packingFile = require("../middlewares/packing-file");

router.post('/upload/:id', packingFile, (req, res) => {
    FileController.create(req, res).then()
});
router.get('/download/:id', (req, res) => {
    FileController.download(req, res).then()
});

module.exports = router;