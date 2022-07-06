const express = require("express")
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const mongoose = require("mongoose");
const router  = require("./Router/Router");
app.use(express.json())
app.use('/api', router)

async function startApp() {
    try{
        await mongoose.connect(DB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            family: 4,
        }).then(app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT)));
    } catch (e) {
        console.log(e)
    }
}
startApp()
