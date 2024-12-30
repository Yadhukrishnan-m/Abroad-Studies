

const Consultation = require('../../models/userDetails');
const FormSubmit = async(req,res) =>{
    try {

        const { name, email, phone, city, qualification } = req.body;
        console.log(req.body)

        const consultation = new Consultation({
            name,
            email,
            phone,
            city,
            qualification,
           
        });
        await consultation.save();


        res.status(200).json({ 
            success: true, 
            message: 'Consultation request received successfully' 
        });
        
    } catch (error) {
        console.error('Error saving consultation request:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to save consultation request' 
        });
    }
}

module.exports={
    FormSubmit,
}