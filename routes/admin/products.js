const express = require("express")
const multer = require("multer")
const products = require("../../Repositories/products")
const newProductTemplate = require("../../views/admin/products/new")
const { checkProductTitle,checkProductPrice} = require("./validator")
const {handleErrors,requireAuth} = require("./middlewares")
const router = express.Router();
const upload = multer({Storage:multer.memoryStorage()})
const productsListTemplate = require("../../views/admin/products/index")
const productEditTemplate = require("../../views/admin/products/edit")

router.get("/admin/products",requireAuth,async (req,res)=>{
    const p =await products.getAll();
res.send(productsListTemplate({p}));
})
router.get("/admin/products/new",requireAuth,(req,res)=>{
    res.send(newProductTemplate({}));
})

 router.post("/admin/products/new",requireAuth,
 upload.single("image"),
[checkProductTitle,checkProductPrice],
handleErrors(newProductTemplate),
async (req,res)=>{
const image = req.file.buffer.toString("base64")
const {title,price} = req.body
await products.create({image,price,title});
res.redirect("/admin/products/");
})


router.get("/admin/products/:id/edit",requireAuth,async (req,res)=>{
    const product = await products.findById(req.params.id);
    if(!product)
    res.send("no prodduct found");
    res.send(productEditTemplate({product}))
})

router.post("/admin/products/:id/edit",requireAuth,
upload.single("image"),
[checkProductTitle,checkProductPrice],
handleErrors(productEditTemplate,async (req)=>{
    const product = await products.findById(req.params.id);
    return {product:product};
}),async (req,res)=>{
   
    const changes = req.body;
    if(req.file){
        changes.image = req.file.buffer.toString("base64")
    }
    try{
        await products.update(req.params.id,changes)

    }catch(err){
       return  res.send("there is no product")
    }
    res.redirect("/admin/products");


})
router.post("/admin/products/:id/delete",requireAuth,async (req,res)=>{
    console.log(req.params.id)
await products.delete(req.params.id);
res.redirect("/admin/products")
})





module.exports = router;