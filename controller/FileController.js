const path = require("path");
const FileService = require("../service/FileService");
const files = require("../model/File")

class FileController {
    async create(req, res) {
        if (req.file) {
            FileService.create(req.file).then();
        }
        res.send('ok');
    }

    async getFile(req, res) {
        await FileService.getFile(res, req.params.id);
        console.log(res);
    }

    async download(req, res){
        const fileInDb = await files.findById(req.params.id)
        const file = path.join(__dirname, '../data', fileInDb.name)
        res.download(file);
    }

    async update(req, res){
        if (req.file) {
            const file = await files.findById(req.params.id);
            FileService.editFile(req.file, file).then()
        }
        res.send('updated')
    }
}

module.exports = new FileController();