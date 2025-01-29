const router = require('express').Router()
const user = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
        res.status(201).send({
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

router.post('/login',async(req,res)=>{
    try {    
        const existeduser = await user.findOne({email:req.body.email});  
        if(!existeduser){
            return res.status(400).send({
                message: 'user does not exists',
                success: false
            })
        }
        const isValid = await bcrypt.compare(req.body.password,existeduser.password)
        console.log('v',isValid)
        if(!isValid){
            return res.status(400).send({
                message: 'invalid password',
                success: false
            })
        }      
        const token = jwt.sign({userId:existeduser._id},process.env.SECRET_KEY,{expiresIn:'1d'})
        res.status(200).send({
            message: 'login successfully',
            success: true,
            token,
        })      
    } catch (error) {
        res.status(400).send({
            message: error.message,
            success: false
        })
    }
})

module.exports = router