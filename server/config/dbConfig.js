const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL)
const DB = mongoose.connection

DB.on('connected',()=>{
    console.log('DB is connected')
})

DB.on('err',()=>{
    console.log('DB is not connected')
})

module.exports = DB