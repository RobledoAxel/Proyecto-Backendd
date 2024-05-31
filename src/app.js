import express from "express"
import apiproductsrouter from "./routes/api.products.router.js"
import apicartsrouter from "./routes/api.carts.router.js"

const app = express();

app.use(express.json())
app.use("/api/products",apiproductsrouter)
app.use("/api/carts",apicartsrouter)

//no llegue a completar la parte del carrito

const PORT= process.env.PORT || 8080;


app.listen(PORT,(req,res)=>{
    console.log(`listening on PORT ${PORT}`)
})