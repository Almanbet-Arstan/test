const express = require("express")
const packingFile = require('./middlewares/packing-file');
const PORT = 5000;
const app = express();
const DB_URL = "mongodb+srv://test:test@test.snfb0.mongodb.net/?retryWrites=true&w=majority";
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const logger = require("./logger")
const format = require("node.date-time")
const Schema = mongoose.Schema;
const fileSchema = new Schema({
    name: {type: String, required:true},
    type: {type: String, required:true},
    size: {type: Number, required:true}
}, {
    collection: 'files'
})
const fileDetails = mongoose.model('files', fileSchema);
app.use(express.json())
app.post('/upload/:id', packingFile, (req, res) => {
    if (req.file) {
        const name = req.params.id;
        const type = req.header('content-type');
        const size = req.header('content-length');
        const File = mongoose.model("File", fileSchema);
        fileDetails.findOne({name: new RegExp('^'+name+'$', "i")}, function(err, doc) {
            if (doc != null){
                fileDetails.findOneAndUpdate(
                    {name: name}, // критерий выборки
                    {$set: {type: type, size: size}}, // параметр обновления
                    function (err, result) {
                        console.log(result);
                    }
                );
            }else if (doc == null) {
                logger.info("Начало сохранения файла " + new Date().format("y-M-d H:M:S"))
                File.create({name: name, type: type, size: size}).then(r => {
                logger.info("Окончание сохранения файла " + new Date().format("y-M-d H:M:S"))
                const stats = fs.statSync(path.join(__dirname, 'data'))
                const fileSizeInBytes = stats.size;
                const fileSizeInMegabytes = fileSizeInBytes / (1024*1024);
                if (fileSizeInMegabytes > 10){
                    logger.info("Общий размер файлов в папке превысил определенный лимит")
                }else logger.info("Общий размер файлов в папке не превысил определенный лимит")
                });
            }
        });
    }
    res.send('ok');
})
app.get('/download/:id', function(req, res){
    const file = path.join(__dirname, 'data', req.params.id);
    res.download(file); // Set disposition and send it.
});
async function startApp() {
    try{
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
    } catch (e) {
        console.log(e)
    }
}
startApp()
