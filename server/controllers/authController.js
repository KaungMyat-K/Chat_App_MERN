const router = require('express').Router()
const user = require('../models/user')
const bcrypt = require('bcryptjs')

router.post('/signup',async (req,res)=>{
    try {
        const existeduser = await user.findOne({email: req.body.email})
        if(existeduser){
            return  res.status(400).send({
                message: 'user already exists',
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        req.body.password = hashedPassword
        const newUser = new user(req.body)
        await newUser.save()
        res.status(200).send({
            message: "user saved successfully",
            success: true
        })
    } catch (error) {
        res.status(400).send({
            message: error.message,
            success: false
        })
    }
})

module.exports = router