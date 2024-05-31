import { Router } from "express";
import express from "express"
import ProductsManagers from "../managers/ProductsManagers.js";

const apiProductsRouter=Router();
apiProductsRouter.use(express.json());
const Manager = new ProductsManagers();


apiProductsRouter.post(`/`,async (req,res)=>{
    const productoNuevo= req.body;
    if(!productoNuevo.code||!productoNuevo.price||!productoNuevo.stock||!productoNuevo.title){
        return res.status(400).send({status:"error",error: "incomplete values"})
    }
    const result = await Manager.createProduct(productoNuevo);
    if(result === -1){
        return res.status(500).send({status:"error",error: "intente en otro momento gracias."})
    }
    return res.send({status:`success!`,mensaje:`producto creado con id ${result}`})
})

apiProductsRouter.get(`/`,async (req,res)=>{
    const allProducts= await Manager.leerProduts();
    if(allProducts === -1){
        return res.status(500).send({status:`error`,error:`error server`})
    }
    res.send({status:`success!`,payload: allProducts})

})

apiProductsRouter.get(`/:pid`,async (req,res)=>{
    const allProducts= await Manager.leerProduts();
    const id = req.params.pid
    const indice = allProducts.findIndex(producto => producto.id == id)
    if(indice >0){
        const result=allProducts[indice];
        res.send({status:`success!`,payloads: result})
    }
    }
)
apiProductsRouter.put(`/:pid`,async (req,res)=>{
    const allProducts = await Manager.leerProduts();
    const id=req.params.pid;
    const productoNuevo= req.body;
    if(isNaN(id) ||id <=0 ||id > allProducts.length ){
        return res.status(400).send(`error: ${error}`)
    }
    const indice = allProducts.findIndex(producto => producto.id == pid)
    if(indice >0){ 
        allProducts[indice] =productoNuevo;
    }
    res.send({status:`success! producto actualizado corrctamente`})
    }
)
apiProductsRouter.delete(`/:pid`,async(req,res)=>{
    const allProducts = await Manager.leerProduts();
    const id = req.params.pid
    if(isNaN(id) ||id <=0 || id > allProducts.length ){
        return res.status(400).send(`error: ${error}`)
    }
    const indice = allProducts.findIndex(producto => producto.id == id)
    if(indice >0){ 
        allProducts[indice].splice(id -1,1) ;
    }
    res.send({status:`success! producto eliminado corrctamente`})
    
})

export default apiProductsRouter;