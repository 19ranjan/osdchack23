const authController = require('./authController')

const multer = require('multer')
const uploadController=require('express').Router()

//destination->where the image will be saved (in which directory)
//filename-> what will be the name of the saved image
const storage= multer.diskStorage({
    destination: (req,file, cb)=>{
        cb(null,'public/images')
    },
    filename:(req,file,cb)=>{
        cb(null, req.body.filename)
    }
})

const upload=multer({
    storage
})
uploadController.post("/image",upload.single("image"),async(req,res)=>{
    try{
        return res.status(200).json("file uploadwe success!")
    }
    catch(error){
        console.error(error)
    }
})
module.exports=authController