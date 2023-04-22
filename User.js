const mongoose=require("mongoose")
mongoose.connect(process.env.MONGO_URL, ()=>console.log("mongo succefuoll"));


const UserSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:10
    },
    profileImg:{
        type:String,
        default:""
    }
},{timestamps:true})
module.exports=mongoose.model("User", UserSchema)