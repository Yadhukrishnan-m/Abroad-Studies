const Banner = require('../../models/banner'); 

const Consultation = require('../../models/userDetails');

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user:process.env.NODEMAILER_EMAIL ,
      pass:process.env.NODEMAILER_PASSWORD,
    },
  });


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

        const mailOptions = {
            from:process.env.NODEMAILER_EMAIL, // Sender address
            to: "gsa.sreenath.manjoorans@gmail.com", // Your own email address
            subject: "New Registration Details",
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="text-align: center; padding: 20px; background-color: #f4f4f4; border-bottom: 2px solid #ddd;">
                  <h1 style="color: #0078D7; margin: 0;">Randet</h1>
                  <p style="margin: 0; font-size: 16px;">New User Registration Details</p>
                </div>
                <div style="padding: 20px;">
                  <h2 style="color: #0078D7;">Hello Admin,</h2>
                  <p>A new user has registered with the following details:</p>
                  <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                    <tr style="background-color: #f9f9f9;">
                      <th style="text-align: left; padding: 10px; border: 1px solid #ddd;">Field</th>
                      <th style="text-align: left; padding: 10px; border: 1px solid #ddd;">Details</th>
                    </tr>
                    <tr>
                      <td style="padding: 10px; border: 1px solid #ddd;">Name</td>
                      <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; border: 1px solid #ddd;">Email</td>
                      <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; border: 1px solid #ddd;">Phone</td>
                      <td style="padding: 10px; border: 1px solid #ddd;">${phone}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; border: 1px solid #ddd;">City</td>
                      <td style="padding: 10px; border: 1px solid #ddd;">${city}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; border: 1px solid #ddd;">Qualification</td>
                      <td style="padding: 10px; border: 1px solid #ddd;">${qualification}</td>
                    </tr>
                  </table>
                </div>
              </div>
            `,
          };
          
          // Send email
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending email:", error);
            } else {
              console.log("Email sent successfully:", info.response);
            }
          });
          
            

 res.redirect('/contact');
        
    } catch (error) {
        console.error('Error saving consultation request:', error);
      
    }
}



module.exports={
    loadContact,
    FormSubmit
}