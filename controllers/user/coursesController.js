const Banner = require('../../models/banner'); 
const Course=require('../../models/course')

const getCourses = async(req,res) =>{
    try {
        const courses = await Course.find().sort({ createdAt: -1 }); 
        const banner = await Banner.findOne();
        return res.render('courses',{banner,courses})
        
    } catch (error) {
        res.status(404)
        return console.log('Error in  Courses')
    }
}

module.exports={
    getCourses,
}