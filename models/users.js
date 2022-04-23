const mongoose=require('mongoose');

const user=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true
    }    
});

const USER=mongoose.model('users',user);

module.exports=USER;