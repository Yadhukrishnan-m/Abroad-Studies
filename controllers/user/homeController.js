const Banner = require('../../models/banner'); 
  const home=async(req,res)=>{
    try {
      const banner = await Banner.findOne();  

      return  res.render("home",{banner})
    } catch (error) {
      res.status(400)
       return console.log('error in home');
        
    }
  }

  module.exports={
    home
  };