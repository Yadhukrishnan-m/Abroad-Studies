const Course=require('../../models/course')
const Banner = require('../../models/banner'); 
  const home=async(req,res)=>{
    try {
      const banner = await Banner.findOne();  
      const courses = await Course.find().sort({ createdAt: -1 }).limit(3); 
    

      return  res.render("home",{banner,courses})
    } catch (error) {
      res.status(400)
       return console.log('error in home');
        
    }
  }
  

  module.exports={
    home
  };