import fs from "fs";

export default class CartsManagers{
    constructor(){
        this.path=`files/carts.json`;
        this.init()
    }
    async init(){
        if(fs.existsSync(this.path)){
            console.log(`ok.`)
        }else{
            try{ 
            console.log(`creando un nuevo`)
            await fs.promises.writeFile(this.path,JSON.stringify([]))

            }catch(error){
                console.log(`el archivo no pudo crearse.error: ${error}`)
                process.exit(1);
            }
        }
    }
    async getProduts (){
        try{ 
        const data= fs.promises.readFile(this.path,`utf-8`)
        return JSON.parse(data);
        }catch(error){
            console.log(error);
            process.exit(1);
        }
    }
}
//no llegue hacer la ultima parte,no logre comprenderla del todo