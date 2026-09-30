const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();

const filePath = path.join(__dirname,"db.json")

async function readfile() {
    try{
        let data = await fs.readFile(filePath,'utf-8');
        return JSON.parse(data)
    }catch (err){
        console.log(err)
    }
}

app.get("/products",async(req,res)=>{
    try{
        let products = await readfile();
        console.log(products)
        res.json(products);
    }catch (err){
        console.log(err)
    }
})

app.listen(3001)