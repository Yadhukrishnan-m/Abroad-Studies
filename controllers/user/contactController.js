const Banner = require('../../models/banner'); 

const Consultation = require('../../models/userDetails');

const loadContact = async(req,res) =>{
    try {
        const banner = await Banner.findOne();
        return res.render('contact',{banner});
        
    } catch (error) {
        res.status(404)
        return console.log('Error in  getAbout')
    }
}



const FormSubmit = async(req,res) =>{
    try {

        const { name, email, phone, city, qualification } = req.body;

        const consultation = new Consultation({
            name,
            email,
            phone,
            city,
            qualification,
           
        });
        await consultation.save();

 res.redirect('/contact');
        
    } catch (error) {
        console.error('Error saving consultation request:', error);
      
    }
}



module.exports={
    loadContact,
    FormSubmit
}