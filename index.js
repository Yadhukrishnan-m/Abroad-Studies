const express=require('express');
const app=express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.use(express.static('public'));

// const adminRoute = require('./routes/adminRoute');
// app.use('/admin',adminRoute)



//for user route
const userRoute = require('./routes/userRoute');
app.use('/',userRoute)



app.listen(3000,()=>{
    console.log("server is running");    
})