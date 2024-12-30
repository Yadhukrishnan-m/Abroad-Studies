const express=require('express');
const app=express();
const session = require('express-session');
const dotenv = require("dotenv");
dotenv.config();

const db=require('./config/dbConfig')
   db();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 


// session
app.use(session({
    secret:'aloo',
    resave:false,
    saveUninitialized:true,
    cookie:{
      secure:false,
      httpOnly:true,
      maxAge:72*60*60*1000,
    }
  }))

app.use(express.static('public'));

const adminRoute = require('./routes/adminRoute');
app.use('/admin',adminRoute)



//for user route
const userRoute = require('./routes/userRoute');
app.use('/',userRoute)



app.listen(3000,()=>{
    console.log("server is running");    
})