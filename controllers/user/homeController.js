  
  const home=async(req,res)=>{
    try {
      return  res.render("home")
    } catch (error) {
      res.status(400)
       return console.log('error in home');
        
    }
  }

  module.exports={
    home
  };