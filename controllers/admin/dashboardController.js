const loadDashboard=async(req,res)=>{
    try {
        res.render('dashboard');
    } catch (error) {
        console.log('error in load dashboard'+error);
        
    }
}

module.exports={
    loadDashboard
}