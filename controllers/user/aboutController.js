const Banner=require('../../models/banner')
const getAbout = async(req,res) =>{
    try {
   let  banner=await Banner.findOne()

     

        return res.render('about',{banner})
        
    } catch (error) {
        res.status(404)
        return console.log('Error in  getAbout')
    }
}

module.exports={
    getAbout,
}