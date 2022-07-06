const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    name: {type: String, required:true},
    type: {type: String, required:true},
    size: {type: Number, required:true}
}, {
    collection: 'files'
})

module.exports = mongoose.model('files', fileSchema);
