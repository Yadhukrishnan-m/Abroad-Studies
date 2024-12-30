
const getCourses = async(req,res) =>{
    try {

        return res.render('courses')
        
    } catch (error) {
        res.status(404)
        return console.log('Error in  Courses')
    }
}

module.exports={
    getCourses,
}