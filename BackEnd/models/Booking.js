const mongoose=require('mongoose');
const schema=mongoose.Schema;

//Define the Admin schema
const BookingSchema=new schema({

    pickupdate:{
        type:String,
        required: true
    },
    returndate:{
        type:String,
        required:true
    },
    regnumber:{
        type:String,
        required: true
    },
    vid:{
        type:String,
        required: true
    },
    uid:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    contactno:{
        type:String,
        required: true
    },
    dlicen:{
        type:String,
        required: true
    },
    aditionalreq:{
        type:String,
    },
    status:{
        type:String,
        required:true
    }


});

const BookingSchema1=new mongoose.model('Bookdetail',BookingSchema);
module.exports=BookingSchema1;