const mongoose=require("mongoose")
const adminSchema=new mongoose.Schema({
   
    banner:{
        type:String,
        required:true
    },

  
   
},{ collection: 'Banner' });

module.exports= mongoose.model('Banner',adminSchema);
