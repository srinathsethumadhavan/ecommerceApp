
const express = require("express")
const router = express.Router();

const users = require("../../Repositories/users");
const signupTemplate = require("../../views/admin/auth/signup")
const signinTemplate = require("../../views/admin/auth/signin") 
const {email,password,passwordConfirmation,emailExistscheck,validPasswordCheckForUser} = require("./validator")
const {handleErrors} = require("./middlewares")



router.get("/signup",(req,res)=> {
    res.send(signupTemplate({req:req}))
    
} )
router.get("/signin",(req,res)=> res.send(signinTemplate({})))

router.post("/signup", [email,password,passwordConfirmation],
handleErrors(signupTemplate),
async (req,res)=>{
    
const {email,password}  = req.body ;
const user = await users.create({email,password});

    // session property is added on the req by cookie-session
    req.session.userId = user.id;
res.redirect("/admin/products/");
})



router.post("/signin",
[emailExistscheck,validPasswordCheckForUser],
handleErrors(signinTemplate),
async (req,res)=>{
    
    const {email} = req.body;
    const record = await users.filter({email});
    if(!record)
    res.send("no user with the emailid  exists")


   
    req.session.userId= record.id;
    res.redirect("/admin/products/");
})


router.get("/logout",(req,res)=>{
    req.session = null;
    res.send("successfully loggedout")
})


module.exports = router;