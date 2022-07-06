const path = require("path");
const format = require("node.date-time");
const FileService = require("../Service/FileService");

class FileController {
    async create(req, res) {
        if (req.file) {
            const name = req.params.id;
            const type = req.header('content-type');
            const size = req.header('content-length');
            FileService.createOrUpdate(req).then();
            FileService.createFileLocally(req.file, req.params.id).then();
        }
        res.send('ok');
    }

    async download(req, res){
        const file = path.join(__dirname, '../data', req.params.id);
        res.download(file);
    }
}

module.exports = new FileController();