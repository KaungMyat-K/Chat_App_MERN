const express = require('express')
const app = express()
const authrouter = require('./controllers/authController')
const userrouter = require('./controllers/userController')

app.use(express.json())
app.use('/api/auth',authrouter)
app.use('/api/user',userrouter)

module.exports = app;