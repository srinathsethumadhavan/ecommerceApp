const express = require("express")
const router = express.Router()
const products = require("../Repositories/products")
const productsLandingPageTemplate = require("../views/products/index")
router.get("/",async (req,res)=>{
  const productsList = await products.getAll();
  
    res.send(productsLandingPageTemplate({productsList}))

})
module.exports = router;