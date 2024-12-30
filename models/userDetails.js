const mongoose = require('mongoose');
const {Schema} = mongoose;


const userDetailsSchema = new Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    qualification:{
        type:String,
        required:true,
    },



},{timestamps:true});



const UserDetails = mongoose.model('UserDetails',userDetailsSchema);
module.exports=UserDetails;