const express = require('express')
const app = express()
const authrouter = require('./controllers/authController')
const userrouter = require('./controllers/userController')
const chatrouter = require('./controllers/chatController')
const messagerouter = require('./controllers/messageController')

app.use(express.json())
app.use('/api/auth',authrouter)
app.use('/api/user',userrouter)
app.use('/api/chat',chatrouter)
app.use('/api/message',messagerouter)

module.exports = app;