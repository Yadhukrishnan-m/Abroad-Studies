const express=require('express');
const user_route=express();


user_route.set('view engine','ejs');
user_route.set('views','./views/user');
  

const home=require("../controllers/user/homeController");
const About = require('../controllers/user/aboutController');
const Courses = require('../controllers/user/coursesController');
const Consultation = require('../controllers/user/consultationFormController');

user_route.get("/",home.home)
user_route.get('/about',About.getAbout);
user_route.get('/courses',Courses.getCourses);
user_route.post('/api/consultation',Consultation.FormSubmit)

user_route.get('*',function(req,res){
    res.render('page-404');         
    })
module.exports=user_route;