


const germany = async(req,res) =>{
    try{
        return res.render('germany');
    }catch(error){
        res.status(404)
        return console.log('Error in  Germany')
    }
}

const australia = async(req,res) =>{
    try{
        return res.render('australia');
    }catch(error){
        res.status(404)
        return console.log('Error in  Australia')
    }
}


const france = async(req,res) =>{
    try{
        return res.render('france');
    }catch(error){
        res.status(404)
        return console.log('Error in  France')
    }
}

const ireland = async(req,res) =>{
    try{
        return res.render('ireland');
    }catch(error){
        res.status(404)
        return console.log('Error in  Ireland')
    }
}

const uk = async(req,res) =>{
    try{
        return res.render('uk');
    }catch(error){
        res.status(404)
        return console.log('Error in  UK')
    }
}


module.exports={
    germany,
    australia,
    france,
    ireland,
    uk,
}
