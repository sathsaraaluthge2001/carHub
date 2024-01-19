const mongoose=require('mongoose');
const schema=mongoose.Schema;

//Define the Admin schema
const UserSchema=new schema({

    image:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    address:{
        type:String,
        required: true
    },
    nic:{
        type:String,
        required: true
    },
    contactno:{
        type:String,
        required: true
    },
    gender:{
        type:String,
        required: true
    }


});

const UserSchema1=new mongoose.model('Userdetail',UserSchema);
module.exports=UserSchema1;