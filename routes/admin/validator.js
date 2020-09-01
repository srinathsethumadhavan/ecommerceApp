const {check} = require("express-validator")
const users = require("../../Repositories/users")

module.exports= {

    checkProductTitle :
    check("title").trim().isLength({min :4 , max :20}).withMessage('length must be between 4 and 20 characters'),

    checkProductPrice :
    check("price").trim().toFloat().isFloat({min:1}).withMessage('Must be a number greater than 1 '),

    email:

    check("email").trim().normalizeEmail().isEmail() .withMessage('Must be a valid email')

    .custom(async email=>{
    const existingUser =  await users.filter({email});
    if(existingUser)
        throw new Error("Email already in use")
    }),

    password: check("password").trim().isLength({min:4 ,max:20}).withMessage('Must be between 4 and 20 characters'),

    passwordConfirmation:

    check("passwordConfirmation")
    .trim()
    .isLength({min:4 ,max:20})
    .withMessage('Must be between 4 and 20 characters')
    .custom((passwordConfirmation,{req})=>{
    if(req.body.password!==passwordConfirmation)
        throw new Error("passwords must match");
        return true;
    }),

    emailExistscheck:
    check("email").trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("must be a valid Email")
    .custom(async (email)=>
        {
        const user = await users.filter({email})
        if(!user)
            throw new Error("user not found")
    }),

    validPasswordCheckForUser:
    check("password")
    .trim()
    .custom(async (password,{req})=>{
        const user = await users.filter({email: req.body.email})
        if(!user)
            throw new Error("invadfdflid Passowrd")
        const validPassword = await users.comparePassword(user.password,password);
        if(!validPassword)
        throw new Error("incorrect password")
        
    })

}