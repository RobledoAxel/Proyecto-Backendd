import fs from "fs"
import express from "express"

export default class ProductsManagers{

    constructor(){
        this.path="./files/Productos.json";
        this.init();
    }
    //chequear y/o crear si no existe
    async init(){
        if(fs.existsSync(this.path)){
            console.log(`ok. la ruta ya existe`)
        }else{
            try{  
            console.log(`creando la nueva ruta`)
            await fs.promises.writeFile(this.path,JSON.stringify([]))
            return console.log(`archivo creado`);
            }catch(error){
                console.log(`el archivo no pudo crearse.error: ${error}`);
                process.exit(1)
            }
        }
    }
    //leer los productos
    async leerProduts (){
        try{ 
        const data= await fs.promises.readFile(this.path,"utf-8")
        return JSON.parse(data);

        }catch(error){
            return console.log(`la lectura de archivos no pudo procesarse: ${error}`);
        }
    }
    //carga de datos
    createProduct= async ({title,description,code,price,stock,status=true})=>{ 
        const nuevoProducto = {
            title,
            description,
            code,
            price,
            stock,
            status
        }
        //obtengo el producto creado
        const productos= await this.leerProduts() 
        //chequeo de la existencia de productos.    
        if(!productos){
            console.log(`su solicitud no pudo procesarse. Favor de intertar mas tarde`)
            return -1;
        }
        //manipulacion de objetos con su id
        if(productos.length === 0){
            nuevoProducto.id=1;
        }else{
            nuevoProducto.id= productos[productos.length -1].id +1;
        }
        productos.push(nuevoProducto);

         //vuelvo a ingresar todos los datos
        await fs.promises.writeFile(this.path,JSON.stringify(productos,null,"\t"))

        console.log(`el producto ${nuevoProducto.title} ah sido creado correctamente`);
        return nuevoProducto.id;
} 
}