const express = require("express");
const FileController = require("../controller/FileController");
const router = express.Router();
const packingFile = require("../middlewares/packing-file");

router.post('/upload', packingFile, (req, res) => {
    FileController.create(req, res).then()
});
router.get('/download/:id', (req, res) => {
    FileController.download(req, res).then()
});
router.get('/get/:id', (req, res) => {
    FileController.getById(req, res).then()
});
router.put('/update/:id', packingFile, (req, res) => {
    FileController.update(req, res).then()
});

module.exports = router;