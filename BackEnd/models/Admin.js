const mongoose=require('mongoose');
const schema=mongoose.Schema;

//Define the Admin schema
const AdminSchema=new schema({

    image:{
        type:String,
        required: true
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
    role:{
        type:String,
        required: true
    }


});

const AdminSchema1=new mongoose.model('Admidetail',AdminSchema);
module.exports=AdminSchema1;