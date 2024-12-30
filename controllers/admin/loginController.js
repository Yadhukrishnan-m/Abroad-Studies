
// const Admin = require("../../models/adminmodel");
const Admin = require("../../models/admin");
const bcrypt = require("bcrypt");

const loadLogin = async (req, res) => {
    try {
      res.render("login");
    } catch (error) {
      console.log(error);
    }
  };

  const verifyAdmin = async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const adminData = await Admin.findOne({ email: email });

      if (adminData) {
       
        
        const passwordMatch = await bcrypt.compare(password, adminData.password);
        if (passwordMatch) {
          req.session.admin_id = adminData._id;
          return res.json({ success: true });
        } else {
          return res.json({
            success: false,
            message: "Email and passcode is incorrect",
          });
        }
      } else {
        return res.json({
          success: false,
          message: "Email and passcode is incorrect",
        });
         res.render('adminLogin',{message:'error'})
      }
    } catch (error) {
      console.log(error);
    }
  };



  module.exports={
loadLogin,
verifyAdmin
  }




