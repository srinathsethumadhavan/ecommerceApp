const {validationResult} = require("express-validator")

module.exports={
    handleErrors(templateFunction,dataCb)
    {
        return async (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            let data={}
            if(dataCb){
                data = await dataCb(req);
            }
            console.log(data)
            return res.send(templateFunction({errors,...data}));
        }
       
        next();
    }
    
},
requireAuth(req,res,next){
    if(!req.session.userId)
    return res.redirect("/signin");
    next();
}
}