const mongoose=require('mongoose');
const Schema=mongoose.Schema;

// Define the vehicle schema
const vehicleSchema=new Schema({

    image: {
        type:String,
        required: true
    },

    brand:{
        type:String,
        required: true
    },

    model:{
        type:String,
        required: true
    },

    year:{
        type:Number,
        required: true
    },

    type:{
        type:String,
        required: true
    },

    fueltype:{
        type:String,
        required: true
    },

    features:{
        type:String,
        required: true
    },

    priceperday:{
        type:Number,
        required: true
    },

    transmission:{
        type:String,
        required: true
    },

    regnumber:{
        type:String,
        required: true
    },

    available:{
        type:String,
        required: true
    }


});

// Create a model based on the schema
const vehiSchema1=mongoose.model("vehiDetail",vehicleSchema);
// Export the model
module.exports=vehiSchema1;