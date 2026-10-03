const express = require('express');
const fs = require('fs/promises');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const filePath = path.join(__dirname,"db.json")

const cache = {}

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
        let key = req.url;
        let value = cache[key];
        if(value){
            return res.json(value);
        }
        let products = await readFileWithDelay();
        cache[key]=products;
        return res.json(products)
    }catch (err){
        console.log(err)
    }
})

app.get("/products/:id",async(req, res) => {
    try {
        let key = req.url; 
        let value = cache[key];
    
        if (value) {
            return res.json(value);
        }

        let products = await readFileWithDelay();
        const { id } = req.params;
        let product = products.find((prod) => prod.id == id);

        if (product) {
            cache[key] = product;
            return res.json(product);
        } else {
            return res.status(404).json({ message: "Product not found" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})