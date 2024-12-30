const express=require('express');
const session=require('express-session')
const flash = require('connect-flash');
const admin_route=express();


admin_route.use(session({
    name:'admin_session',
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Set to true if using HTTPS
}));

const multer = require('multer');
const path=require("path");

admin_route.set('view engine','ejs');
admin_route.set('views','./views/admin');


admin_route.use(flash());

// Middleware to pass flash messages to every response
admin_route.use((req, res, next) => {
//   res.locals.msg = req.flash('msg');
res.locals.errorMsg = req.flash('errorMsg');
res.locals.successMsg = req.flash('successMsg');
  next();
});

const loginController=require('../controllers/admin/loginController');
const dashboardController=require('../controllers/admin/dashboardController');
const bannerController=require('../controllers/admin/bannerController');
const courseController=require('../controllers/admin/courseController');
//requiring middlewares for authentication
// const adminAuth=require('../middleware/adminAuth') 


// const admin_route = require('./adminRoute');
admin_route.get('/',loginController.loadLogin);
admin_route.post('/',loginController.verifyAdmin);
admin_route.get('/dashboard',dashboardController.loadDashboard);
admin_route.get('/banner',bannerController.loadBanner);
admin_route.post('/banner',bannerController.upload,bannerController.addBanner)
admin_route.get('/course',courseController.loadCourse);
admin_route.post('/course',courseController.addCourse);
admin_route.get('/course/:courseId', courseController.deleteCourse);

admin_route.get('*',function(req,res){
  res.render('page-404');         //after localhost.../admin whatever the parameter passed it redirect to /admin again
  })


module.exports=admin_route; 