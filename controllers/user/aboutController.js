
const getAbout = async(req,res) =>{
    try {

        return res.render('about')
        
    } catch (error) {
        res.status(404)
        return console.log('Error in  getAbout')
    }
}

module.exports={
    getAbout,
}