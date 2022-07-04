const express = require("express")
const packingFile = require('./middlewares/packing-file');
const PORT = 5000;
const app = express();
const DB_URL = "mongodb+srv://test:test@test.snfb0.mongodb.net/?retryWrites=true&w=majority";
const mongoose = require("mongoose");
const path = require("path");
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
        const fileInDb = fileDetails.findOne({name: new RegExp('^'+name+'$', "i")}, function(err, doc) {
            console.log(doc);
            if (doc != null){
                fileDetails.findOneAndUpdate(
                    {name: name}, // критерий выборки
                    {$set: {type: type, size: size}}, // параметр обновления
                    function (err, result) {
                        console.log(result);
                    }
                );
            }else File.create({name: name, type: type, size: size}).then();
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
