const router = require('express').Router()
const message = require('../models/message')
const chat = require('../models/chat')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/new-message',authMiddleware,async(req,res)=>{
    try {
        const newMessage = new message(req.body)
        const savedMessage = await newMessage.save()
        // const currentChat = await chat.findById(req.body.chatId)
        // currentChat.lastMessage = savedMessage._id
        // await currentChat.save()
        const currentChat = await chat.findByIdAndUpdate({
            _id: req.body.chatId
        },{
            lastMessage:savedMessage._id,
            $inc: {unreadMessageCount: 1}
        })
        res.status(201).send({
            message: "message sent successfully",
            success: true,
            data : savedMessage
        })
    } catch (error) {
        res.status(400).send({
            message: error.message,
            success: false
        }) 
    }
     
})

router.get('/get-all-messages/:chatId',authMiddleware,async(req,res)=>{
    try {
        const allMessages = await message.find({chatId:req.params.chatId})
                                            .sort({createdAt:1})
        res.status(200).send({
            message: "messages fetched successfully",
            success: true,
            data : allMessages
        })
    } catch (error) {
        res.status(400).send({
            message: error.message,
            success: false
        }) 
    }
     
})

module.exports = router