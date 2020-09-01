const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cookieSession  = require("cookie-session");
const authRouter = require("./routes/admin/auth")
const AdminProductsRouter = require("./routes/admin/products")
const productsRouter =require("./routes/products")
const cartsRouter = require("./routes/carts")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cookieSession({
    keys:["drj834092iwqoksijdiei02qso"]
}))


app.use(authRouter);
app.use(AdminProductsRouter);
app.use(productsRouter)
app.use(cartsRouter)

app.listen(process.env.PORT|| 3000,()=>{
    console.log("listening on port 3000")
})