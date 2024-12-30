const mongoose=require("mongoose")
const adminSchema=new mongoose.Schema({
   
    course:{
        type:String,
        required:true
    },

    image:{
        type:String,
        required :true
    },
    description:{
        type:String,
        required:true
    },

},{ collection: 'Course' });

module.exports= mongoose.model('Course',adminSchema);
