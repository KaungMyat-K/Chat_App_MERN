const router = require('express').Router()
const user = require('../models/user')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/get-logger-user',authMiddleware,async(req,res)=>{
    try {
        const existeduser = await user.findOne({_id:req.body.userId})
        res.status(200).send({
            message: "user fetched successfully",
            success: true,
            data : existeduser
        })
    } catch (error) {
        res.status(400).send({
            message: error.message,
            success: false
        }) 
    }
     
})

module.exports = router