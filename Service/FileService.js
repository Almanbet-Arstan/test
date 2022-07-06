const files = require('../Model/File');
const logger = require("../logger");
const fs = require("fs");
const path = require("path");

class FileService{
    async createOrUpdate(req){
        files.findOne({name: new RegExp('^'+req.params.id+'$', "i")}, function(err, doc) {
            if (doc != null){
                files.findOneAndUpdate(
                    {name: req.params.id}, // критерий выборки
                    {$set: {type: req.header('content-type'), size: req.header('content-length')}}, // параметр обновления
                    function (err, result) {
                        console.log(result);
                    }
                );
            }else if (doc == null) {
                logger.info("Начало сохранения файла " + new Date().format("y-M-d H:M:S"))
                files.create({name: req.params.id, type:req.header('content-type'), size: req.header('content-length')}).then(r => {
                    logger.info("Окончание сохранения файла " + new Date().format("y-M-d H:M:S"))
                    const stats = fs.statSync(path.join(__dirname, '../data'))
                    const fileSizeInBytes = stats.size;
                    const fileSizeInMegabytes = fileSizeInBytes / (1024*1024);
                    if (fileSizeInMegabytes > 10){
                        logger.info("Общий размер файлов в папке превысил определенный лимит")
                    }else logger.info("Общий размер файлов в папке не превысил определенный лимит")
                });
            }
        });
    }
    async createFileLocally(buffer, pathToFile){
        const writeStream = fs.createWriteStream(path.join(__dirname, '..', 'data', pathToFile));
        writeStream.write(buffer)
    }
}
module.exports = new FileService();