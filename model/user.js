const mongoose=require('mongoose');
//Creating the schema
const userSchema=new mongoose.Schema({
    googleId:{
        type:String
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
},);
const User=mongoose.model('User',userSchema);
module.exports=User;