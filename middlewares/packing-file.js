const fs = require("fs");
const path = require("path");
module.exports = (req, res, next) =>  {
    let buffer = Buffer.from('');
    req.on('data', (chunk) => {
        buffer = Buffer.concat([buffer, chunk]);
        const writeStream = fs.createWriteStream(path.join(__dirname, '..', 'data', req.params.id));
        writeStream.write(buffer)
    });
    req.on('end', () => {
        req.file = {buffer};
        next();
    })
}