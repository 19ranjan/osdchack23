const authController= require('express').Router()
const User=require('../models/User')
const bcrypt= require("bcrypt")
const jwt=require('jsonwebtoken')
//const email={User.req.body.email};
//register
authController.post('/register', async(req,res)=>{
    try{
        //await User('email').findOne(); // Works!
        const isExisting = await User.findOne({email:req.body.email}).lean();
        if(isExisting){
            throw new Error("already registered!")
        }

        const hashedPassword=await bcrypt.hash(req.body.password, 10)

        const newUser= await User.create({...req.body, password:hashedPassword})

        const {password, ...others}=newUser._doc
        const token=jwt.sign({id:newUser._id}, process.env.JWT_SECRET, {expiresIn:'9d'})

        return res.status(201).json({others,token})
    }catch(error){
        return res.status(500).json(error.message)
    }
})

//login

authController.post('/login', async(req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email})
        if(!user){
            throw new Error("wrong cred!")
        }
        const comparePass=await bcrypt.compare(req.body.password, user.password)
        if(!comparePass){
            throw new Error("wrong cred!")
        }

        const token= jwt.sign({id: user,_id}, process.env.JWT_SECRET,{expiresIn:'4d'})
        const {password,...others}=user._doc

        return res.status(200).json({others, token})
    }
    catch(error){
        return res.status(500).json(error.message)
    }
})

module.exports=authController