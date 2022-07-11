const fs = require("fs");
const path = require("path");

module.exports = {
    createFileLocally(file, fileData) {
        const writeStream = fs.createWriteStream(path.join(__dirname, '..', 'data', fileData.name));
        writeStream.write(file.buffer.toString());
    }
}

// const put = (buffer) => {
//    return new Promise((req, rej) => {
//        const stream = fs.createWriteStream('./uploads')
//        stream.write(buffer)
//        stream.on('start', () => {})
//        stream.on('error', () => {})
//        stream.on('finish', () => {})
//        stream.on('close', () => {})
//    })
// }
