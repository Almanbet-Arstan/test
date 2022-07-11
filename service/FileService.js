const files = require('../model/File');
const logger = require("../logger");
const fs = require("fs");
const path = require("path");
const format = require("node.date-time");
const { v4: uuidv4 } = require('uuid');
const adapter = require('../utils/adapter')


class FileService{
    async create(file){
        const fileData = {
            name: uuidv4(),
            type: file.type,
            size: file.size,
        };
        logger.info("Начало сохранения файла " + new Date().format("y-M-d H:M:S"))
        files.create(fileData);
        adapter.createFileLocally(file, fileData)
        logger.info("Окончание сохранения файла " + new Date().format("y-M-d H:M:S"))
        const stats = fs.statSync(path.join(__dirname, '../data'))
        const fileSizeInBytes = stats.size;
        const fileSizeInMegabytes = fileSizeInBytes / (1024*1024);
        if (fileSizeInMegabytes > 10){
            logger.info("Общий размер файлов в папке превысил определенный лимит")
        }else logger.info("Общий размер файлов в папке не превысил определенный лимит")
    }

    async editFile(newFileData, file) {
        const newFile = {
            name: file.name,
            type: newFileData.type,
            size: newFileData.size,
        };

        await files.findByIdAndUpdate(file._id, newFile);
        const writeStream = fs.createWriteStream(path.join(__dirname, '../data', file.name));
        writeStream.write(newFileData.buffer);
    }
}
module.exports = new FileService();