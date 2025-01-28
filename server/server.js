const dotenv = require('dotenv')
dotenv.config({path : './config.env'})
const dbconfig = require('./config/dbConfig')
const app = require("./app")

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log('server is started on port number : '+port)
})