const express = require('express');
const fs = require('fs/promises');
const path = require('path');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3001;

const filePath = path.join(__dirname,"db.json")

async function readfile() {
    try{
        let data = await fs.readFile(filePath,'utf-8');
        return JSON.parse(data)
    }catch (err){
        console.log(err)
    }
}

async function readFileWithDelay(){
    await new Promise((resolve,reject)=>{setTimeout(resolve,1500)})
    return await readfile()
}

app.get("/products",async(req,res)=>{
    try{
        let products = await readFileWithDelay();
        console.log(products)
        res.json(products);
    }catch (err){
        console.log(err)
    }
})

app.get("/products/:id",async(req,res)=>{
    try{
        let products = await readFileWithDelay();
        const {id} = req.params;
        let product = products.find((prod)=>prod.id == id);
        if(product){
            res.json(product);
        }else{
            res.status(404).json({message:"Product not found"})
        }
    }catch (err){
        console.log(err)
    }
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})